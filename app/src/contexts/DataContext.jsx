import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  authService,
  serviceService,
  rewardService,
  transactionService,
  vehicleService,
  maintenanceService,
  proposalService,
} from '../services';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { token, userRole, isLoggedIn } = useAuth();

  const [services, setServices] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [proposals, setProposals] = useState([]);

  const fetchAllData = useCallback(async () => {
    if (!token) return;

    try {
      const [
        servicesRes,
        rewardsRes,
        transactionsRes,
        vehiclesRes,
        maintenanceRes,
        proposalsRes,
      ] = await Promise.all([
        serviceService.getAll(token),
        rewardService.getAll(token),
        transactionService.getAll(token),
        vehicleService.getAll(token),
        maintenanceService.getAll(token),
        proposalService.getAll(token),
      ]);

      setServices(servicesRes.data || []);
      setRewards(rewardsRes.data || []);
      setTransactions(transactionsRes.data || []);
      setVehicles(vehiclesRes.data || []);
      setMaintenance(maintenanceRes.data || []);
      setProposals(proposalsRes.data || []);

      // Fetch customers only for admin
      if (userRole === 'admin') {
        const customersRes = await authService.getUsers(token);
        const users = Array.isArray(customersRes) ? customersRes : [];
        setCustomers(users.filter((u) => u.role === 'user'));
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, [token, userRole]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn, fetchAllData]);

  // --- EXISTING OPERATIONS (Service, Reward, etc) ---
  
  const addService = async (serviceData) => {
    try {
      await serviceService.create(serviceData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      await serviceService.update(id, serviceData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const deleteService = async (id) => {
    try {
      await serviceService.delete(id, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addReward = async (rewardData) => {
    try {
      await rewardService.create(rewardData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateReward = async (id, rewardData) => {
    try {
      await rewardService.update(id, rewardData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const deleteReward = async (id) => {
    try {
      await rewardService.delete(id, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const exchangeReward = async (id) => {
    try {
      await rewardService.exchange(id, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      await transactionService.create(transactionData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const toggleTransactionStatus = async (id, currentStatus) => {
    let nextStatus;
    if (currentStatus === "Menunggu") nextStatus = "Proses";
    else if (currentStatus === "Proses") nextStatus = "Selesai";
    else nextStatus = "Menunggu";

    try {
      await transactionService.updateStatus(id, nextStatus, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;
    try {
      await transactionService.deleteTransaction(id, token);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addVehicle = async (vehicleData) => {
    try {
      await vehicleService.create(vehicleData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addUser = async (userData) => {
    try {
      await authService.createUser(userData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addMaintenance = async (maintenanceData) => {
    try {
      await maintenanceService.create(maintenanceData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addProposal = async (proposalData) => {
    try {
      await proposalService.create(proposalData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const acceptProposal = async (id) => {
    if (!window.confirm("Terima penawaran ini? Transaksi akan otomatis dibuat.")) return;
    try {
      await proposalService.accept(id, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const rejectProposal = async (id) => {
    if (!window.confirm("Yakin ingin menolak penawaran ini?")) return;
    try {
      await proposalService.reject(id, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    // Data
    services,
    rewards,
    customers,
    transactions,
    vehicles,
    maintenance,
    proposals,

    // Operations
    fetchAllData,
    addService,
    updateService,
    deleteService,
    addReward,
    updateReward,
    deleteReward,
    exchangeReward,
    addTransaction,
    toggleTransactionStatus,
    addVehicle,
    addUser,
    addMaintenance,
    deleteTransaction,
    addProposal,   
    acceptProposal,
    rejectProposal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;