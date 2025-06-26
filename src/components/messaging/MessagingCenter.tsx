
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { MessagePopup } from './MessagePopup';

interface User {
  id: string;
  full_name: string;
  role: string;
  email: string;
}

interface Conversation {
  user: User;
  lastMessage?: string;
  unreadCount: number;
  lastActivity?: string;
}

export const MessagingCenter: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (!user) return;

    // Only show messaging for students and alumni, not admins
    if (user.role === 'admin') {
      console.log('Messaging not available for admin users');
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from('users')
        .select('id, full_name, role, email')
        .neq('id', user.id);

      // Filter based on user role
      if (user.role === 'student') {
        // Students can message admins and alumni
        query = query.in('role', ['admin', 'alumni']);
      } else if (user.role === 'alumni') {
        // Alumni can message admins and students
        query = query.in('role', ['admin', 'student']);
      }

      const { data, error } = await query;
      if (error) throw error;

      setUsers(data || []);
      await fetchConversations(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async (userList: User[]) => {
    if (!user) return;

    try {
      const conversations: Conversation[] = [];

      for (const contact of userList) {
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user.id},recipient_id.eq.${contact.id}),and(sender_id.eq.${contact.id},recipient_id.eq.${user.id})`)
          .order('created_at', { ascending: false })
          .limit(1);

        const { data: unreadMessages } = await supabase
          .from('messages')
          .select('id')
          .eq('sender_id', contact.id)
          .eq('recipient_id', user.id)
          .eq('is_read', false);

        conversations.push({
          user: contact,
          lastMessage: messages?.[0]?.message,
          unreadCount: unreadMessages?.length || 0,
          lastActivity: messages?.[0]?.created_at
        });
      }

      // Sort by last activity
      conversations.sort((a, b) => {
        if (!a.lastActivity && !b.lastActivity) return 0;
        if (!a.lastActivity) return 1;
        if (!b.lastActivity) return -1;
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      });

      setConversations(conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, [user]);

  // Don't show messaging for admin users
  if (user?.role === 'admin') {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Messaging is not available for admin users.</p>
            <p className="text-sm mt-2">Students and alumni can message you directly.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messages
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-96">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                {searchTerm ? 'No conversations found' : 'No messages yet'}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredConversations.map((conversation, index) => (
                  <div key={conversation.user.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-4 h-auto"
                      onClick={() => setSelectedUser(conversation.user)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {conversation.user.full_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">
                              {conversation.user.full_name}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {conversation.user.role}
                            </Badge>
                          </div>
                          {conversation.lastMessage && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {conversation.lastMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    </Button>
                    {index < filteredConversations.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedUser && (
        <MessagePopup
          recipientId={selectedUser.id}
          recipientName={selectedUser.full_name}
        />
      )}
    </>
  );
};
