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
} from './pages';

const MODAL_TITLES = {
  addService: 'Tambah Layanan',
  editService: 'Edit Layanan',
  addReward: 'Tambah Reward',
  editReward: 'Edit Reward',
  addTransaction: 'Tambah Transaksi',
  addVehicle: 'Tambah Motor',
  addUser: 'Tambah Pelanggan',
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
    addMaintenance,
  } = useData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const { isOpen, modalType, editingItem, openModal, closeModal } = useModal();
  const { form, handleChange, resetForm, setFormData } = useForm({});

  const handleOpenModal = (type, item = null) => {
    if (item) {
      setFormData(item);
    } else {
      resetForm({});
    }
    openModal(type, item);
  };

  const handleCloseModal = () => {
    resetForm({});
    closeModal();
  };

  // Form submit handlers
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

    // For admin, include customerId if provided, otherwise it will use the logged-in user
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

  const handleUserSubmit = async () => {
    const result = await addUser(form);
    if (result.success) {
      handleCloseModal();
    } else {
      alert(result.message || 'Gagal tambah pelanggan');
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

  // Render modal content based on type
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

    if (modalType === 'addUser') {
      return (
        <UserForm
          form={form}
          onChange={handleChange}
          onSubmit={handleUserSubmit}
          onCancel={handleCloseModal}
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

  // Render page content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'services':
        return <ServicesPage onOpenModal={handleOpenModal} />;
      case 'rewards':
        return <RewardsPage onOpenModal={handleOpenModal} />;
      case 'transactions':
        return <TransactionsPage onOpenModal={handleOpenModal} />;
      case 'customers':
        return <CustomersPage onOpenModal={handleOpenModal} />;
      case 'vehicles':
        return <VehiclesPage onOpenModal={handleOpenModal} />;
      case 'maintenance':
        return <MaintenancePage onOpenModal={handleOpenModal} />;
      case 'schedule':
        return <SchedulePage />;
      case 'history':
        return <HistoryPage />;
      default:
        return <Dashboard />;
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
