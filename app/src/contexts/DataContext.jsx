import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  authService,
  serviceService,
  rewardService,
  transactionService,
  vehicleService,
  maintenanceService,
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

  const fetchAllData = useCallback(async () => {
    if (!token) return;

    try {
      const [
        servicesRes,
        rewardsRes,
        transactionsRes,
        vehiclesRes,
        maintenanceRes,
      ] = await Promise.all([
        serviceService.getAll(token),
        rewardService.getAll(token),
        transactionService.getAll(token),
        vehicleService.getAll(token),
        maintenanceService.getAll(token),
      ]);

      setServices(servicesRes.data || []);
      setRewards(rewardsRes.data || []);
      setTransactions(transactionsRes.data || []);
      setVehicles(vehiclesRes.data || []);
      setMaintenance(maintenanceRes.data || []);

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

  // Service operations
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

  // Reward operations
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

  // Transaction operations
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
  else nextStatus = "Menunggu"; // kalau dari selesai balik ke awal

  try {
    await transactionService.updateStatus(id, nextStatus, token);
    await fetchAllData();
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

  // Vehicle operations
  const addVehicle = async (vehicleData) => {
    try {
      await vehicleService.create(vehicleData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // User operations
  const addUser = async (userData) => {
    try {
      await authService.createUser(userData, token);
      await fetchAllData();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Maintenance operations
  const addMaintenance = async (maintenanceData) => {
    try {
      await maintenanceService.create(maintenanceData, token);
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

  const value = {
    // Data
    services,
    rewards,
    customers,
    transactions,
    vehicles,
    maintenance,
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
