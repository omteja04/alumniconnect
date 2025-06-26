
import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminManageStudents } from './AdminManageStudents';
import { AdminManageAlumni } from './AdminManageAlumni';
import { AdminViewProfiles } from './AdminViewProfiles';
import { AdminRequests } from './AdminRequests';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';
import { AdminMessages } from './AdminMessages';
import { AdminPostJob } from './AdminPostJob';

type AdminSection = 'dashboard' | 'students' | 'alumni' | 'profiles' | 'requests' | 'analytics' | 'settings' | 'messages' | 'jobs';

export const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardOverview />;
      case 'students':
        return <AdminManageStudents />;
      case 'alumni':
        return <AdminManageAlumni />;
      case 'profiles':
        return <AdminViewProfiles />;
      case 'requests':
        return <AdminRequests />;
      case 'messages':
        return <AdminMessages />;
      case 'jobs':
        return <AdminPostJob />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 p-6">
        {renderActiveSection()}
      </main>
    </div>
  );
};
