
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookUser, Bell, User, File, Briefcase, MessageCircle, TrendingUp } from 'lucide-react';
import { AlumniJobManagement } from '@/components/alumni/AlumniJobManagement';
import { AlumniMessages } from '@/components/alumni/AlumniMessages';

export const AlumniDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const recentActivity = [
    {
      id: 1,
      type: "job_posted",
      title: "Posted Software Engineer position",
      company: "TechCorp Inc.",
      date: "2 days ago"
    },
    {
      id: 2,
      type: "referral_request",
      title: "Referral request from John Doe",
      company: "Google",
      date: "1 week ago"
    }
  ];

  const stats = {
    jobsPosted: 3,
    referralsGiven: 8,
    studentsHelped: 12,
    successRate: 85
  };

  if (activeTab === 'jobs') {
    return <AlumniJobManagement />;
  }

  if (activeTab === 'messages') {
    return <AlumniMessages />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Alumni Dashboard</h1>
            <p className="text-foreground/70 mt-2">Share opportunities and mentor the next generation.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-blue-accent/30 hover:border-blue-accent">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button className="bg-blue-accent hover:bg-blue-accent/90">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Management
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Jobs Posted</p>
                      <p className="text-2xl font-bold text-blue-accent">{stats.jobsPosted}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-accent/20 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Referrals Given</p>
                      <p className="text-2xl font-bold text-green-secondary">{stats.referralsGiven}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-secondary/20 rounded-full flex items-center justify-center">
                      <BookUser className="w-6 h-6 text-green-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Students Helped</p>
                      <p className="text-2xl font-bold text-green-bright">{stats.studentsHelped}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-bright/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-bright" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Success Rate</p>
                      <p className="text-2xl font-bold text-foreground">{stats.successRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-foreground/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-accent rounded-full"></div>
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Common tasks to help students succeed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setActiveTab('jobs')}
                    className="w-full bg-blue-accent hover:bg-blue-accent/90 justify-start"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Post a New Job Opportunity
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-secondary/30 hover:border-green-secondary justify-start"
                  >
                    <BookUser className="w-4 h-4 mr-2" />
                    Review Referral Requests
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('messages')}
                    variant="outline" 
                    className="w-full border-green-bright/30 hover:border-green-bright justify-start"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Students & Admins
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-bright rounded-full"></div>
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Your latest contributions to the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 rounded-lg border border-border/40 hover:border-blue-accent/40 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          {activity.company && (
                            <p className="text-sm text-foreground/70">{activity.company}</p>
                          )}
                        </div>
                        <Badge 
                          variant="outline"
                          className={activity.type === 'job_posted' 
                            ? 'bg-blue-accent/20 text-blue-accent border-blue-accent/30' 
                            : 'bg-green-secondary/20 text-green-secondary border-green-secondary/30'
                          }
                        >
                          {activity.type === 'job_posted' ? 'Job Posted' : 'Referral'}
                        </Badge>
                      </div>
                      <span className="text-xs text-foreground/50">{activity.date}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
