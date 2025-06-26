import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

type UserRole = 'student' | 'alumni' | 'admin';

interface AuthUser extends User {
    role?: UserRole;
    full_name?: string;
    department?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, userData: { role: UserRole; fullName: string; department?: string }) => Promise<{ error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: any }>;
    updateProfile: (updates: { full_name?: string; department?: string; theme_preference?: 'light' | 'dark' }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (userId: string) => {
        try {
            console.log('Fetching user profile for:', userId);
            const { data: userData, error } = await supabase
                .from('users')
                .select('role, full_name, department, theme_preference')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                return null;
            }

            console.log('User profile data:', userData);
            return userData;
        } catch (error) {
            console.error('Exception fetching user profile:', error);
            return null;
        }
    };

    useEffect(() => {
        let mounted = true;

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session?.user?.id);

                if (!mounted) return;

                setSession(session);

                if (session?.user) {
                    // Use setTimeout to avoid blocking the auth state change
                    setTimeout(async () => {
                        if (!mounted) return;

                        const userData = await fetchUserProfile(session.user.id);

                        if (mounted && userData) {
                            setUser({
                                ...session.user,
                                role: userData.role,
                                full_name: userData.full_name,
                                department: userData.department
                            });
                        } else if (mounted) {
                            // If we can't fetch user data, set basic user without role
                            console.log('Setting user without additional data');
                            setUser(session.user as AuthUser);
                        }

                        if (mounted) {
                            setLoading(false);
                        }
                    }, 0);
                } else {
                    setUser(null);
                    setLoading(false);
                }
            }
        );

        // Check for existing session
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                console.log('Initial session check:', session?.user?.id);

                if (!mounted) return;

                if (session?.user) {
                    setSession(session);
                    const userData = await fetchUserProfile(session.user.id);

                    if (mounted && userData) {
                        setUser({
                            ...session.user,
                            role: userData.role,
                            full_name: userData.full_name,
                            department: userData.department
                        });
                    } else if (mounted) {
                        setUser(session.user as AuthUser);
                    }
                }

                if (mounted) {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signUp = async (email: string, password: string, userData: { role: UserRole; fullName: string; department?: string }) => {
        try {
            console.log('Starting signup process for:', email);
            const redirectUrl = `${window.location.origin}/`;

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: redirectUrl,
                    data: {
                        role: userData.role,
                        full_name: userData.fullName,
                        department: userData.department || null
                    }
                }
            });

            if (error) {
                console.error('Sign up error:', error);
                return { error };
            }

            console.log('Signup successful:', data);
            return { error: null };
        } catch (error) {
            console.error('Sign up error:', error);
            return { error };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            console.log('Starting signin process for:', email);
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Sign in error:', error);
                setLoading(false);
                return { error };
            }

            console.log('Signin successful:', data);
            toast({
                title: "Welcome back!",
                description: "You have successfully signed in.",
            });

            return { error: null };
        } catch (error) {
            console.error('Sign in error:', error);
            setLoading(false);
            return { error };
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Sign out error:', error);
                toast({
                    title: "Error signing out",
                    description: error.message,
                    variant: "destructive",
                });
            } else {
                // Clear local state immediately
                setUser(null);
                setSession(null);
                toast({
                    title: "Signed out successfully",
                    description: "You have been signed out.",
                });
            }
        } catch (error) {
            console.error('Sign out error:', error);
            toast({
                title: "Error signing out",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                console.error('Reset password error:', error);
                return { error };
            }

            return { error: null };
        } catch (error) {
            console.error('Reset password error:', error);
            return { error };
        }
    };

    const updateProfile = async (updates: { full_name?: string; department?: string; theme_preference?: 'light' | 'dark' }) => {
        if (!user) return { error: new Error('No user logged in') };

        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id);

        if (error) {
            console.error('Update profile error:', error);
            return { error };
        }

        // Update local user state
        setUser(prev => prev ? { ...prev, ...updates } : null);
        return { error: null };
    };

    const value = {
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};