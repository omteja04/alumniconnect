
import React from 'react';
import { JobListings } from '@/components/jobs/JobListings';

export const StudentJobBoard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Board</h1>
        <p className="text-muted-foreground">
          Browse available job opportunities posted by alumni and administrators
        </p>
      </div>

      <JobListings />
    </div>
  );
};
