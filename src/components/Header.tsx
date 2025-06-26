import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
    onLoginClick?: () => void;
    onSignupClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
    const { user, signOut, loading } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
    const [signingOut, setSigningOut] = useState(false);

    console.log('Header - User:', user?.id, 'Role:', user?.role, 'Loading:', loading);

    const handleLoginClick = () => {
        if (onLoginClick) {
            onLoginClick();
        } else {
            setAuthModalTab('signin');
            setShowAuthModal(true);
        }
    };

    const handleSignupClick = () => {
        if (onSignupClick) {
            onSignupClick();
        } else {
            setAuthModalTab('signup');
            setShowAuthModal(true);
        }
    };

    const handleDashboardNavigation = () => {
        console.log('Dashboard navigation clicked for user role:', user?.role);

        if (!user?.role) {
            console.log('No user role available, cannot navigate');
            return;
        }

        if (user.role === 'student') {
            console.log('Navigating to student dashboard');
            navigate('/student-dashboard');
        } else if (user.role === 'alumni') {
            console.log('Navigating to alumni dashboard');
            navigate('/alumni-dashboard');
        } else if (user.role === 'admin') {
            console.log('Navigating to admin dashboard');
            navigate('/admin-dashboard');
        } else {
            console.log('Unknown role:', user.role);
        }
    };

    const handleProfileNavigation = () => {
        if (user?.role === 'student') {
            navigate('/student-profile');
        } else if (user?.role === 'alumni') {
            navigate('/alumni-profile');
        }
    };

    const handleSignOut = async () => {
        setSigningOut(true);
        await signOut();
        setSigningOut(false);
        navigate('/');
    };

    const getUserInitials = () => {
        if (user?.full_name) {
            return user.full_name
                .split(' ')
                .map(name => name.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return user?.email?.charAt(0).toUpperCase() || 'U';
    };

    const getRoleColor = () => {
        switch (user?.role) {
            case 'student':
                return 'bg-blue-500';
            case 'alumni':
                return 'bg-green-500';
            case 'admin':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div
                            className="text-2xl font-bold text-gradient cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            AlumniConnect
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
                                Features
                            </a>
                            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
                                How it Works
                            </a>
                            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">
                                About
                            </a>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center space-x-3 h-auto p-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className={`${getRoleColor()} text-white text-sm font-medium`}>
                                                    {getUserInitials()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-medium">
                                                    {user.full_name || user.email}
                                                </span>
                                                {user.role && (
                                                    <span className="text-xs text-muted-foreground capitalize">
                                                        {user.role}
                                                    </span>
                                                )}
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-2 py-1.5">
                                            <p className="text-sm font-medium">{user.full_name || 'User'}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleDashboardNavigation}>
                                            <User className="h-4 w-4 mr-2" />
                                            Dashboard
                                        </DropdownMenuItem>
                                        {(user.role === 'student' || user.role === 'alumni') && (
                                            <DropdownMenuItem onClick={handleProfileNavigation}>
                                                <User className="h-4 w-4 mr-2" />
                                                My Profile
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleSignOut}
                                            disabled={signingOut}
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            {signingOut ? (
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            ) : (
                                                <LogOut className="h-4 w-4 mr-2" />
                                            )}
                                            {signingOut ? 'Signing out...' : 'Sign Out'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" onClick={handleLoginClick}>
                                        Sign In
                                    </Button>
                                    <Button size="sm" onClick={handleSignupClick}>
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultTab={authModalTab}
            />
        </>
    );
};