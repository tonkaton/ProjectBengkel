import React, { useState } from 'react';
import { useAuth, useData } from '../contexts';
import { useModal, useForm } from '../hooks';
import { MainLayout } from './layout';
import { Modal } from './ui';
import { Loading } from './common';
import { ServiceForm, RewardForm, TransactionForm, VehicleForm, UserForm, MaintenanceForm } from './forms';
import {
  LoginPage,
  Dashboard,
  ServicesPage,
  RewardsPage,
  TransactionsPage,
  CustomersPage,
  VehiclesPage,
  MaintenancePage,
  SchedulePage,
  HistoryPage,
  ProposalsPage,
  BookingsPage,
  PointsHistoryPage,
} from './pages';

const MODAL_TITLES = {
  addService: 'Tambah Layanan',
  editService: 'Edit Layanan',
  addReward: 'Tambah Reward',
  editReward: 'Edit Reward',
  addTransaction: 'Tambah Transaksi',
  addVehicle: 'Tambah Motor',
  addUser: 'Tambah Pelanggan',
  editUser: 'Edit Data Pelanggan', // 👈 JUDUL BARU
  addMaintenance: 'Tambah Jadwal Maintenance',
};

const BengkelMotorApp = () => {
  const { isLoggedIn, loading, currentUser } = useAuth();
  const {
    services,
    customers,
    vehicles,
    addService,
    updateService,
    addReward,
    updateReward,
    addTransaction,
    addVehicle,
    addUser,
    updateCustomer, // 👈 IMPORT FUNGSI UPDATE CUSTOMER
    addMaintenance,
  } = useData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const { isOpen, modalType, editingItem, openModal, closeModal } = useModal();
  const { form, handleChange, resetForm, setFormData } = useForm({});

  const handleOpenModal = (type, item = null) => {
    if (item) {
      // 💡 LOGIC KHUSUS SAAT EDIT USER
      if (type === 'editUser') {
        setFormData({
            ...item,
            password: '', // Password dikosongkan saat edit biar aman
        });
      } else {
        setFormData(item);
      }
    } else {
      // 💡 RESET FORM SAAT TAMBAH BARU
      if (type === 'addUser') {
          resetForm({ role: 'user' }); // Default role user
      } else {
          resetForm({});
      }
    }
    openModal(type, item);
  };

  const handleCloseModal = () => {
    resetForm({});
    closeModal();
  };

  // --- FORM SUBMIT HANDLERS ---
  const handleServiceSubmit = async () => {
    const isEditing = modalType === 'editService';
    const result = isEditing
      ? await updateService(editingItem.id, form)
      : await addService(form);

    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.message || 'Gagal menyimpan layanan');
    }
  };

  const handleRewardSubmit = async () => {
    const isEditing = modalType === 'editReward';
    const result = isEditing
      ? await updateReward(editingItem.id, form)
      : await addReward(form);

    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.message || 'Gagal menyimpan reward');
    }
  };

  const handleTransactionSubmit = async () => {
    const payload = {
      UserId: form.customerId || currentUser?.id,
      ServiceId: form.serviceId,
      status: form.status || 'Menunggu',
      note: form.note || '',
    };

    const result = await addTransaction(payload);
    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.message || 'Gagal tambah transaksi');
    }
  };

  const handleVehicleSubmit = async () => {
    const payload = {
      brand: form.brand,
      model: form.model,
      plate: form.plate,
      year: form.year,
      color: form.color,
    };

    if (currentUser?.role === 'admin' && form.customerId) {
      payload.UserId = form.customerId;
    }

    const result = await addVehicle(payload);
    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.message || 'Gagal tambah motor');
    }
  };

  // 👇 LOGIC BARU: BISA ADD ATAU UPDATE USER
  const handleUserSubmit = async () => {
    const isEditing = modalType === 'editUser';
    
    const result = isEditing 
        ? await updateCustomer(editingItem.id, form)
        : await addUser(form);

    if (result.success) {
      handleCloseModal();
      alert(isEditing ? 'Data user berhasil diperbarui!' : 'User baru berhasil ditambahkan!');
    } else {
      alert(result.message || 'Gagal menyimpan data pelanggan');
    }
  };

  const handleMaintenanceSubmit = async () => {
    const payload = {
      UserId: form.customerId,
      vehicleId: form.vehicleId,
      note: form.note || '',
      next_service: form.next_service,
    };

    const result = await addMaintenance(payload);
    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.message || 'Gagal tambah jadwal maintenance');
    }
  };

  // --- RENDER MODAL CONTENT ---
  const renderModalContent = () => {
    if (modalType === 'addService' || modalType === 'editService') {
      return (
        <ServiceForm
          form={form}
          onChange={handleChange}
          onSubmit={handleServiceSubmit}
          onCancel={handleCloseModal}
          isEditing={modalType === 'editService'}
        />
      );
    }

    if (modalType === 'addReward' || modalType === 'editReward') {
      return (
        <RewardForm
          form={form}
          onChange={handleChange}
          onSubmit={handleRewardSubmit}
          onCancel={handleCloseModal}
          isEditing={modalType === 'editReward'}
        />
      );
    }

    if (modalType === 'addTransaction') {
      return (
        <TransactionForm
          form={form}
          onChange={handleChange}
          onSubmit={handleTransactionSubmit}
          onCancel={handleCloseModal}
          customers={customers}
          services={services}
        />
      );
    }

    if (modalType === 'addVehicle') {
      return (
        <VehicleForm
          form={form}
          onChange={handleChange}
          onSubmit={handleVehicleSubmit}
          onCancel={handleCloseModal}
          customers={customers}
          isAdmin={currentUser?.role === 'admin'}
        />
      );
    }

    // 👇 LOGIC FORM USER YANG BARU
    if (modalType === 'addUser' || modalType === 'editUser') {
      return (
        <UserForm
          form={form}
          onChange={handleChange}
          onSubmit={handleUserSubmit}
          onCancel={handleCloseModal}
          isEdit={modalType === 'editUser'} // 👈 Pass prop isEdit
        />
      );
    }

    if (modalType === 'addMaintenance') {
      return (
        <MaintenanceForm
          form={form}
          onChange={handleChange}
          onSubmit={handleMaintenanceSubmit}
          onCancel={handleCloseModal}
          customers={customers}
          vehicles={vehicles}
        />
      );
    }

    return null;
  };

  // --- RENDER PAGE CONTENT ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      
      case 'proposals':
        return <ProposalsPage />;

      case 'bookings':
        return <BookingsPage />;

      case 'services':
        return <ServicesPage onOpenModal={handleOpenModal} />;
      case 'rewards':
        return <RewardsPage onOpenModal={handleOpenModal} />;
      case 'transactions':
        return <TransactionsPage onOpenModal={handleOpenModal} />;
      case 'customers':
        return <CustomersPage onOpenModal={handleOpenModal} />; // 👈 Sudah siap terima editUser
      case 'vehicles':
        return <VehiclesPage onOpenModal={handleOpenModal} />;
      
      case 'maintenance':
        return <MaintenancePage onOpenModal={handleOpenModal} />;
        
      case 'schedule':
        return <SchedulePage />;
        
      case 'history':
        return <HistoryPage />;
        
      case 'points_history':
        return <PointsHistoryPage />;

      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <>
      <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </MainLayout>

      <Modal
        open={isOpen}
        title={MODAL_TITLES[modalType] || ''}
        onClose={handleCloseModal}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default BengkelMotorApp;