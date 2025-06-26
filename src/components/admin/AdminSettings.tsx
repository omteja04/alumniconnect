
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Save, Shield, Bell, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const AdminSettings = () => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState({
    theme_preference: 'light',
    notifications_enabled: true,
    auto_approve_registrations: false
  });

  const { data: adminSettings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');

      if (error) throw error;
      
      const settingsMap = data.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {} as Record<string, any>);

      setSettings({
        theme_preference: settingsMap.theme_preference || 'light',
        notifications_enabled: settingsMap.notifications_enabled || true,
        auto_approve_registrations: settingsMap.auto_approve_registrations || false
      });

      return settingsMap;
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: typeof settings) => {
      const updates = Object.entries(newSettings).map(([key, value]) => ({
        setting_key: key,
        setting_value: value,
        updated_at: new Date().toISOString()
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('admin_settings')
          .upsert(update, { onConflict: 'setting_key' });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({
        title: "Settings Updated",
        description: "Admin settings have been successfully updated.",
      });
    }
  });

  const handleSave = () => {
    updateSettingsMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
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
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure platform settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Theme & Appearance</span>
            </CardTitle>
            <CardDescription>
              Configure the visual appearance of the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-preference">Default Theme</Label>
              <Switch
                id="theme-preference"
                checked={settings.theme_preference === 'dark'}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ 
                    ...prev, 
                    theme_preference: checked ? 'dark' : 'light' 
                  }))
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Set the default theme for new users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Manage notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications_enabled}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, notifications_enabled: checked }))
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Allow the platform to send notifications to users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
            <CardDescription>
              Configure user registration and approval settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-approve">Auto-approve Registrations</Label>
              <Switch
                id="auto-approve"
                checked={settings.auto_approve_registrations}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, auto_approve_registrations: checked }))
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically approve new user registrations without manual review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>System Information</span>
            </CardTitle>
            <CardDescription>
              Platform version and system details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Platform Version</p>
                <p className="text-muted-foreground">v1.0.0</p>
              </div>
              <div>
                <p className="font-medium">Last Updated</p>
                <p className="text-muted-foreground">2024-01-15</p>
              </div>
              <div>
                <p className="font-medium">Database Status</p>
                <p className="text-green-600">Connected</p>
              </div>
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-muted-foreground">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Save Changes</CardTitle>
          <CardDescription>
            Apply your configuration changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSave}
            disabled={updateSettingsMutation.isPending}
            className="w-full sm:w-auto"
          >
            <Save className="h-4 w-4 mr-2" />
            {updateSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
