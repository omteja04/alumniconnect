
import React from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Header } from '@/components/Header';

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
