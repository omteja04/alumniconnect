
import React from 'react';
import { AlumniDashboard } from '@/components/AlumniDashboard';
import { Header } from '@/components/Header';

const AlumniDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlumniDashboard />
    </div>
  );
};

export default AlumniDashboardPage;
