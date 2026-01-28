import React from 'react';
import { useAuth } from '../../contexts';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';

const Dashboard = () => {
  const { isAdmin } = useAuth();

  return isAdmin ? <AdminDashboard /> : <CustomerDashboard />;
};

export default Dashboard;
