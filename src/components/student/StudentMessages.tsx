
import React from 'react';
import { MessagingCenter } from '@/components/messaging/MessagingCenter';

export const StudentMessages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Connect with administrators and alumni for guidance and support
        </p>
      </div>

      <MessagingCenter />
    </div>
  );
};
