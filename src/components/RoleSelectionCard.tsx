
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookUser } from 'lucide-react';

interface RoleSelectionCardProps {
    onRoleSelect: (role: 'student' | 'alumni') => void;
}

export const RoleSelectionCard: React.FC<RoleSelectionCardProps> = ({ onRoleSelect }) => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Choose Your Role</h2>
                <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                    Join our community as a student seeking opportunities or as an alumni ready to mentor and refer
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="group hover:shadow-xl transition-all duration-300 hover-scale border-border/40 hover:border-blue-accent/40">
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-bright to-green-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <BookUser className="w-8 h-8 text-navy-deep" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Student</CardTitle>
                        <CardDescription className="text-foreground/60">
                            Find job opportunities, connect with alumni, and get mentorship
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ul className="space-y-3 mb-6 text-sm text-foreground/70">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-bright rounded-full"></div>
                                <span>AI-powered job recommendations</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-bright rounded-full"></div>
                                <span>Direct referral requests to alumni</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-bright rounded-full"></div>
                                <span>Mentorship opportunities</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-bright rounded-full"></div>
                                <span>Resume and profile optimization</span>
                            </li>
                        </ul>
                        <Button
                            onClick={() => onRoleSelect('student')}
                            className="w-full bg-gradient-secondary text-navy-deep hover:opacity-90 font-semibold"
                        >
                            Join as Student
                        </Button>
                    </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover-scale border-border/40 hover:border-blue-accent/40">
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-accent to-navy-deep rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-8 h-8 text-gray-soft" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Alumni</CardTitle>
                        <CardDescription className="text-foreground/60">
                            Post jobs, mentor students, and expand your professional network
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ul className="space-y-3 mb-6 text-sm text-foreground/70">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-accent rounded-full"></div>
                                <span>Post job openings and internships</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-accent rounded-full"></div>
                                <span>AI-matched student recommendations</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-accent rounded-full"></div>
                                <span>Mentor the next generation</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-accent rounded-full"></div>
                                <span>Build your professional brand</span>
                            </li>
                        </ul>
                        <Button
                            onClick={() => onRoleSelect('alumni')}
                            className="w-full bg-blue-accent hover:bg-blue-accent/90 text-white font-semibold"
                        >
                            Join as Alumni
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
