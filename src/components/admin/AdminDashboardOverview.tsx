
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, FileCheck, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminDashboardOverview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const [studentsResult, alumniResult, requestsResult] = await Promise.all([
        supabase.from('users').select('id').eq('role', 'student'),
        supabase.from('users').select('id').eq('role', 'alumni'),
        supabase.from('profile_approval_requests').select('id').eq('status', 'pending')
      ]);

      return {
        totalStudents: studentsResult.data?.length || 0,
        totalAlumni: alumniResult.data?.length || 0,
        pendingRequests: requestsResult.data?.length || 0,
        totalUsers: (studentsResult.data?.length || 0) + (alumniResult.data?.length || 0)
      };
    }
  });

  const statsCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      description: 'Active student accounts',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Alumni',
      value: stats?.totalAlumni || 0,
      description: 'Registered alumni',
      icon: GraduationCap,
      color: 'text-green-600'
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests || 0,
      description: 'Awaiting approval',
      icon: FileCheck,
      color: 'text-yellow-600'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      description: 'All registered users',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Manage your platform from this central dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">New student registration</span>
                <span className="text-xs text-muted-foreground ml-auto">2 mins ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Alumni profile updated</span>
                <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Approval request submitted</span>
                <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent">
              <div className="font-medium">Review Pending Requests</div>
              <div className="text-sm text-muted-foreground">
                {stats?.pendingRequests} requests waiting
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent">
              <div className="font-medium">Export User Data</div>
              <div className="text-sm text-muted-foreground">
                Download platform statistics
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-accent">
              <div className="font-medium">System Settings</div>
              <div className="text-sm text-muted-foreground">
                Configure platform preferences
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
