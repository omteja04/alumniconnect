
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2, UserCheck, Building } from 'lucide-react';

export const AdminManageAlumni = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: alumni, isLoading } = useQuery({
    queryKey: ['admin-alumni'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          alumni_profiles (*)
        `)
        .eq('role', 'alumni');

      if (error) throw error;
      return data;
    }
  });

  const filteredAlumni = alumni?.filter(alumnus =>
    alumnus.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.alumni_profiles?.[0]?.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manage Alumni</h1>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
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
        <h1 className="text-3xl font-bold">Manage Alumni</h1>
        <p className="text-muted-foreground">
          View and manage all alumni accounts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alumni Directory</CardTitle>
          <CardDescription>
            Total Alumni: {alumni?.length || 0}
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Graduation Year</TableHead>
                <TableHead>Mentorship</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlumni?.map((alumnus) => (
                <TableRow key={alumnus.id}>
                  <TableCell className="font-medium">
                    {alumnus.full_name}
                  </TableCell>
                  <TableCell>{alumnus.email}</TableCell>
                  <TableCell>{alumnus.department || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{alumnus.alumni_profiles?.[0]?.company || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {alumnus.alumni_profiles?.[0]?.graduation_year || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={alumnus.alumni_profiles?.[0]?.availability_for_mentorship ? 'default' : 'secondary'}
                    >
                      {alumnus.alumni_profiles?.[0]?.availability_for_mentorship ? 'Available' : 'Not Available'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
