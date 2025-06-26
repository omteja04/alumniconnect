
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, User, GraduationCap } from 'lucide-react';

export const AdminViewProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'alumni'>('all');

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['admin-all-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          student_profiles (*),
          alumni_profiles (*)
        `)
        .in('role', ['student', 'alumni']);

      if (error) throw error;
      return data;
    }
  });

  const filteredProfiles = profiles?.filter(profile => {
    const matchesSearch = profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || profile.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">View Profiles</h1>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">View Profiles</h1>
        <p className="text-muted-foreground">
          Browse all user profiles in read-only mode
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Directory</CardTitle>
          <CardDescription>
            Total Profiles: {profiles?.length || 0}
          </CardDescription>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={roleFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('all')}
              >
                All
              </Button>
              <Button
                variant={roleFilter === 'student' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('student')}
              >
                Students
              </Button>
              <Button
                variant={roleFilter === 'alumni' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('alumni')}
              >
                Alumni
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles?.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {profile.role === 'student' ? (
                        <User className="h-5 w-5 text-blue-500" />
                      ) : (
                        <GraduationCap className="h-5 w-5 text-green-500" />
                      )}
                      <Badge variant={profile.role === 'student' ? 'default' : 'secondary'}>
                        {profile.role}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{profile.full_name}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{profile.department || 'Not specified'}</p>
                  </div>
                  
                  {profile.role === 'student' && profile.student_profiles?.[0] && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="text-sm font-medium">{profile.student_profiles[0].year || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CGPA</p>
                        <p className="text-sm font-medium">{profile.student_profiles[0].cgpa || 'N/A'}</p>
                      </div>
                    </>
                  )}
                  
                  {profile.role === 'alumni' && profile.alumni_profiles?.[0] && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="text-sm font-medium">{profile.alumni_profiles[0].company || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Graduation Year</p>
                        <p className="text-sm font-medium">{profile.alumni_profiles[0].graduation_year || 'N/A'}</p>
                      </div>
                    </>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
