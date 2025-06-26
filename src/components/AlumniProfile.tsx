
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Edit, Download, Plus, X, Linkedin, Upload, Eye } from 'lucide-react';

interface AlumniProfileData {
    graduation_year?: string;
    roll_number?: string;
    location?: string;
    education_summary?: string;
    company?: string;
    designation?: string;
    domain?: string;
    experience_years?: number;
    success_story?: string;
    availability_for_mentorship?: boolean;
    linkedin_url?: string;
    resume_url?: string;
    skills?: string[];
    certifications?: Array<{
        name: string;
        provider: string;
        year: string;
    }>;
    profile_picture?: string;
}

export const AlumniProfile: React.FC = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState<AlumniProfileData>({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPublicView, setShowPublicView] = useState(false);
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
                .from('alumni_profiles')
                .select('*')
                .eq('user_id', user?.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                return;
            }

            if (data) {
                setProfileData({
                    graduation_year: data.graduation_year,
                    roll_number: data.roll_number,
                    location: data.location,
                    education_summary: data.education_summary,
                    company: data.company,
                    designation: data.designation,
                    domain: data.domain,
                    experience_years: data.experience_years,
                    success_story: data.success_story,
                    availability_for_mentorship: data.availability_for_mentorship || false,
                    linkedin_url: data.linkedin_url,
                    resume_url: data.resume_url,
                    skills: Array.isArray(data.skills) ? data.skills as string[] : [],
                    certifications: Array.isArray(data.certifications) ? data.certifications as Array<{ name: string; provider: string; year: string }> : [],
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
                .from('alumni_profiles')
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

    const downloadResume = () => {
        if (profileData.resume_url) {
            window.open(profileData.resume_url, '_blank');
        } else {
            toast({
                title: "No Resume",
                description: "No resume uploaded yet",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (showPublicView) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Public Profile Preview</h1>
                    <Button onClick={() => setShowPublicView(false)} variant="outline">
                        Back to Edit
                    </Button>
                </div>

                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={profileData.profile_picture} />
                                <AvatarFallback>{user?.full_name?.charAt(0) || 'A'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-semibold">{user?.full_name}</h2>
                                <p className="text-lg text-muted-foreground">{profileData.designation} at {profileData.company}</p>
                                <p className="text-sm text-muted-foreground">{profileData.location}</p>
                            </div>
                        </div>

                        {profileData.success_story && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Success Story</h3>
                                <p className="text-muted-foreground">{profileData.success_story}</p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                            {profileData.skills?.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge variant={profileData.availability_for_mentorship ? "default" : "secondary"}>
                                {profileData.availability_for_mentorship ? "Available for Mentorship" : "Not Available for Mentorship"}
                            </Badge>
                            {profileData.linkedin_url && (
                                <Button size="sm" variant="outline" asChild>
                                    <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-4 w-4 mr-2" />
                                        LinkedIn
                                    </a>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Alumni Profile</h1>
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
                            <Button onClick={() => setShowPublicView(true)} variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                View Public Profile
                            </Button>
                            <Button onClick={() => setIsEditing(true)} variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button onClick={downloadResume}>
                                <Download className="h-4 w-4 mr-2" />
                                Download Resume
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
                                <AvatarFallback>{user?.full_name?.charAt(0) || 'A'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-semibold">{user?.full_name}</h3>
                                <p className="text-muted-foreground">{user?.email}</p>
                                <p className="text-sm text-muted-foreground">{user?.department}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Graduation Year</label>
                                {isEditing ? (
                                    <Input
                                        value={profileData.graduation_year || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, graduation_year: e.target.value }))}
                                        placeholder="e.g., 2020"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">{profileData.graduation_year || 'Not provided'}</p>
                                )}
                            </div>

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
                                <label className="text-sm font-medium">Location</label>
                                {isEditing ? (
                                    <Input
                                        value={profileData.location || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                                        placeholder="e.g., San Francisco, CA"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">{profileData.location || 'Not provided'}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">LinkedIn URL</label>
                                {isEditing ? (
                                    <Input
                                        value={profileData.linkedin_url || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                ) : (
                                    <div className="text-sm text-muted-foreground">
                                        {profileData.linkedin_url ? (
                                            <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                View LinkedIn Profile
                                            </a>
                                        ) : (
                                            'Not provided'
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mentorship Availability Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mentorship</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={profileData.availability_for_mentorship || false}
                                onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, availability_for_mentorship: checked }))}
                                disabled={!isEditing}
                            />
                            <label className="text-sm font-medium">
                                Available for Mentorship
                            </label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Toggle to indicate if you're available to mentor students
                        </p>
                    </CardContent>
                </Card>

                {/* Education Summary Card */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Education Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <Textarea
                                value={profileData.education_summary || ''}
                                onChange={(e) => setProfileData(prev => ({ ...prev, education_summary: e.target.value }))}
                                placeholder="Describe your educational background..."
                                rows={3}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">{profileData.education_summary || 'Not provided'}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Professional Journey Card */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Professional Journey</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Company</label>
                                {isEditing ? (
                                    <Input
                                        value={profileData.company || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                                        placeholder="Company name"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">{profileData.company || 'Not provided'}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Role/Designation</label>
                                {isEditing ? (
                                    <Input
                                        value={profileData.designation || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, designation: e.target.value }))}
                                        placeholder="Your role/title"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">{profileData.designation || 'Not provided'}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Domain/Industry</label>
                                {isEditing ? (
                                    <Input
                                        value={profileData.domain || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, domain: e.target.value }))}
                                        placeholder="e.g., Technology, Finance"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">{profileData.domain || 'Not provided'}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Experience (Years)</label>
                                {isEditing ? (
                                    <Input
                                        type="number"
                                        value={profileData.experience_years || ''}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                                        placeholder="Years of experience"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">{profileData.experience_years || 'Not provided'}</p>
                                )}
                            </div>
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

                {/* Success Story Card */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Success Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <Textarea
                                value={profileData.success_story || ''}
                                onChange={(e) => setProfileData(prev => ({ ...prev, success_story: e.target.value }))}
                                placeholder="Share your journey, achievements, and advice for current students..."
                                rows={5}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">{profileData.success_story || 'Not provided'}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Certifications Card */}
                <Card className="lg:col-span-3">
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
