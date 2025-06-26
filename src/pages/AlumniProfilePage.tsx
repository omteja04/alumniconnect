
import React from 'react';
import { AlumniProfile } from '@/components/AlumniProfile';
import { Header } from '@/components/Header';

const AlumniProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlumniProfile />
    </div>
  );
};

export default AlumniProfilePage;
