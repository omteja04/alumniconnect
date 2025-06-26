import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'signin' | 'signup' | 'forgot-password';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'signin' }) => {
    const { signIn, signUp, resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(defaultTab);

    // Sign In Form State
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    // Sign Up Form State
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        role: '' as 'student' | 'alumni' | 'admin',
        department: '',
    });

    // Forgot Password Form State
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
    });

    const [errors, setErrors] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    // Reset form states when modal opens/closes
    React.useEffect(() => {
        if (isOpen) {
            setActiveTab(defaultTab);
            setErrors('');
            setSuccessMessage('');
        } else {
            // Reset all forms when modal closes
            setSignInData({ email: '', password: '' });
            setSignUpData({
                email: '',
                password: '',
                confirmPassword: '',
                fullName: '',
                role: '' as any,
                department: '',
            });
            setForgotPasswordData({ email: '' });
            setErrors('');
            setSuccessMessage('');
        }
    }, [isOpen, defaultTab]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors('');
        setSuccessMessage('');

        if (!signInData.email || !signInData.password) {
            setErrors('Please fill in all fields');
            setLoading(false);
            return;
        }

        const { error } = await signIn(signInData.email, signInData.password);

        if (error) {
            setErrors(error.message || 'Failed to sign in');
        } else {
            onClose();
        }

        setLoading(false);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors('');
        setSuccessMessage('');

        // Validate form
        if (!signUpData.email || !signUpData.password || !signUpData.fullName || !signUpData.role) {
            setErrors('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (signUpData.password.length < 6) {
            setErrors('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (signUpData.password !== signUpData.confirmPassword) {
            setErrors('Passwords do not match');
            setLoading(false);
            return;
        }

        const { error } = await signUp(signUpData.email, signUpData.password, {
            role: signUpData.role,
            fullName: signUpData.fullName,
            department: signUpData.department || undefined,
        });

        if (error) {
            setErrors(error.message || 'Failed to create account');
        } else {
            setSuccessMessage('Account created successfully! You can now sign in.');
            // Switch to sign in tab after successful signup
            setTimeout(() => {
                setActiveTab('signin');
                setSignInData({ email: signUpData.email, password: '' });
            }, 2000);
        }

        setLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors('');
        setSuccessMessage('');

        if (!forgotPasswordData.email) {
            setErrors('Please enter your email address');
            setLoading(false);
            return;
        }

        const { error } = await resetPassword(forgotPasswordData.email);

        if (error) {
            setErrors(error.message || 'Failed to send reset email');
        } else {
            setSuccessMessage('Password reset email sent! Check your inbox for instructions.');
        }

        setLoading(false);
    };

    const getDialogTitle = () => {
        switch (activeTab) {
            case 'signin':
                return 'Welcome Back';
            case 'signup':
                return 'Create Your Account';
            case 'forgot-password':
                return 'Reset Your Password';
            default:
                return 'Welcome to AlumniConnect';
        }
    };

    const getDialogDescription = () => {
        switch (activeTab) {
            case 'signin':
                return 'Sign in to your account to continue.';
            case 'signup':
                return 'Join our community of students and alumni.';
            case 'forgot-password':
                return 'Enter your email address and we\'ll send you a link to reset your password.';
            default:
                return 'Sign in to your account or create a new one to get started.';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{getDialogTitle()}</DialogTitle>
                    <DialogDescription>
                        {getDialogDescription()}
                    </DialogDescription>
                </DialogHeader>

                {errors && (
                    <Alert variant="destructive">
                        <AlertDescription>{errors}</AlertDescription>
                    </Alert>
                )}

                {successMessage && (
                    <Alert>
                        <Mail className="h-4 w-4" />
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}

                {activeTab === 'forgot-password' ? (
                    <div className="space-y-4">
                        <Button
                            variant="ghost"
                            onClick={() => setActiveTab('signin')}
                            className="p-0 h-auto font-normal text-sm"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Sign In
                        </Button>

                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="forgot-email">Email Address</Label>
                                <Input
                                    id="forgot-email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={forgotPasswordData.email}
                                    onChange={(e) => setForgotPasswordData({ email: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Send Reset Email
                            </Button>
                        </form>
                    </div>
                ) : (
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin">
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signin-email">Email</Label>
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={signInData.email}
                                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signin-password">Password</Label>
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={signInData.password}
                                        onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="p-0 h-auto font-normal text-sm"
                                        onClick={() => setActiveTab('forgot-password')}
                                    >
                                        Forgot your password?
                                    </Button>
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Sign In
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-name">Full Name *</Label>
                                    <Input
                                        id="signup-name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={signUpData.fullName}
                                        onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email *</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={signUpData.email}
                                        onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-role">Role *</Label>
                                    <Select value={signUpData.role} onValueChange={(value: 'student' | 'alumni' | 'admin') =>
                                        setSignUpData(prev => ({ ...prev, role: value }))
                                    }>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="alumni">Alumni</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-department">Department</Label>
                                    <Input
                                        id="signup-department"
                                        type="text"
                                        placeholder="e.g., Computer Science, Mechanical Engineering"
                                        value={signUpData.department}
                                        onChange={(e) => setSignUpData(prev => ({ ...prev, department: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password *</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Create a password (min. 6 characters)"
                                        value={signUpData.password}
                                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-confirm-password">Confirm Password *</Label>
                                    <Input
                                        id="signup-confirm-password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={signUpData.confirmPassword}
                                        onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Create Account
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    );
};