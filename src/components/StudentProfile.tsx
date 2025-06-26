
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Edit, Download, Plus, X } from 'lucide-react';

interface StudentProfileData {
  roll_number?: string;
  gender?: string;
  address?: string;
  current_education?: string;
  year?: string;
  cgpa?: number;
  skills?: string[];
  certifications?: Array<{
    name: string;
    provider: string;
    year: string;
  }>;
  profile_picture?: string;
}

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<StudentProfileData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState({
    name: '',
    provider: '',
    year: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfileData({
          roll_number: data.roll_number,
          gender: data.gender,
          address: data.address,
          current_education: data.current_education,
          year: data.year,
          cgpa: data.cgpa,
          skills: Array.isArray(data.skills) ? data.skills as string[] : [],
          certifications: Array.isArray(data.certifications) ? data.certifications as Array<{name: string; provider: string; year: string}> : [],
          profile_picture: data.profile_picture
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      const { error } = await supabase
        .from('student_profiles')
        .upsert({
          user_id: user?.id,
          ...profileData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error",
          description: "Failed to save profile",
          variant: "destructive",
        });
        return;
      }

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index) || []
    }));
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.provider && newCertification.year) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), { ...newCertification }]
      }));
      setNewCertification({ name: '', provider: '', year: '' });
    }
  };

  const removeCertification = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== index) || []
    }));
  };

  const downloadProfilePDF = () => {
    // TODO: Implement PDF generation
    toast({
      title: "Feature Coming Soon",
      description: "PDF download will be available soon",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button onClick={saveProfile} className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={downloadProfilePDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileData.profile_picture} />
                <AvatarFallback>{user?.full_name?.charAt(0) || 'S'}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{user?.full_name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Roll Number</label>
                {isEditing ? (
                  <Input
                    value={profileData.roll_number || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, roll_number: e.target.value }))}
                    placeholder="Enter roll number"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profileData.roll_number || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Department</label>
                <p className="text-sm text-muted-foreground">{user?.department || 'Not specified'}</p>
              </div>

              <div>
                <label className="text-sm font-medium">Gender</label>
                {isEditing ? (
                  <Input
                    value={profileData.gender || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                    placeholder="Enter gender"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profileData.gender || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                {isEditing ? (
                  <Input
                    value={profileData.address || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profileData.address || 'Not provided'}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Education</label>
              {isEditing ? (
                <Input
                  value={profileData.current_education || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, current_education: e.target.value }))}
                  placeholder="e.g., B.Tech Computer Science"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profileData.current_education || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Year</label>
              {isEditing ? (
                <Input
                  value={profileData.year || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="e.g., 3rd Year"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profileData.year || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">CGPA</label>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.01"
                  max="10"
                  min="0"
                  value={profileData.cgpa || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, cgpa: parseFloat(e.target.value) }))}
                  placeholder="Enter CGPA"
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profileData.cgpa || 'Not provided'}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.skills?.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  {isEditing && (
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeSkill(index)}
                    />
                  )}
                </Badge>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button size="sm" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certifications Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {profileData.certifications?.map((cert, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.provider} • {cert.year}</p>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCertification(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  value={newCertification.name}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Certificate name"
                />
                <Input
                  value={newCertification.provider}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, provider: e.target.value }))}
                  placeholder="Provider"
                />
                <Input
                  value={newCertification.year}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="Year"
                />
                <Button onClick={addCertification}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
