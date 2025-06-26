
import React from 'react';
import { StudentDashboard } from '@/components/StudentDashboard';
import { Header } from '@/components/Header';

const StudentDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StudentDashboard />
    </div>
  );
};

export default StudentDashboardPage;
