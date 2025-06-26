
import React from 'react';
import { PostJobForm } from '@/components/jobs/PostJobForm';
import { JobListings } from '@/components/jobs/JobListings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AlumniJobManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Management</h1>
        <p className="text-muted-foreground">
          Post job opportunities and help students find their next career step
        </p>
      </div>

      <Tabs defaultValue="post" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="post">Post New Job</TabsTrigger>
          <TabsTrigger value="listings">View All Jobs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="post" className="mt-6">
          <PostJobForm />
        </TabsContent>
        
        <TabsContent value="listings" className="mt-6">
          <JobListings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
