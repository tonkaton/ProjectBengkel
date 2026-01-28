import React from 'react';
import { useAuth } from '../../contexts';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';

const Dashboard = ({ onNavigate }) => {
  const { isAdmin } = useAuth(); 

  return isAdmin ? (
    <AdminDashboard /> 
  ) : (
    <CustomerDashboard onNavigate={onNavigate} />
  );
};

export default Dashboard;