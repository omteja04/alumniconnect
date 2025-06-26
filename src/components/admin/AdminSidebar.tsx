
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserCheck, 
  FileCheck, 
  BarChart3, 
  Settings,
  MessageCircle,
  Briefcase
} from 'lucide-react';

type AdminSection = 'dashboard' | 'students' | 'alumni' | 'profiles' | 'requests' | 'analytics' | 'settings' | 'messages' | 'jobs';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const menuItems = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students' as AdminSection, label: 'Manage Students', icon: Users },
    { id: 'alumni' as AdminSection, label: 'Manage Alumni', icon: GraduationCap },
    { id: 'profiles' as AdminSection, label: 'View Profiles', icon: UserCheck },
    { id: 'requests' as AdminSection, label: 'Requests & Approvals', icon: FileCheck },
    { id: 'messages' as AdminSection, label: 'Messages', icon: MessageCircle },
    { id: 'jobs' as AdminSection, label: 'Job Management', icon: Briefcase },
    { id: 'analytics' as AdminSection, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as AdminSection, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">Admin Panel</h2>
      </div>
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
