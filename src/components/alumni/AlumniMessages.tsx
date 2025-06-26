
import React from 'react';
import { MessagingCenter } from '@/components/messaging/MessagingCenter';

export const AlumniMessages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with students and administrators
        </p>
      </div>

      <MessagingCenter />
    </div>
  );
};
