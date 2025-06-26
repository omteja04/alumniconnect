
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookUser, Bell, User } from 'lucide-react';

export const FeatureSection: React.FC = () => {
    const features = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "AI-Powered Matching",
            description: "Our intelligent algorithms match students with relevant job opportunities and connect them with the right alumni mentors.",
            gradient: "from-blue-accent to-navy-deep"
        },
        {
            icon: <BookUser className="w-8 h-8" />,
            title: "Smart Referrals",
            description: "Streamlined referral process that connects students directly with alumni in their field of interest for job opportunities.",
            gradient: "from-green-bright to-green-secondary"
        },
        {
            icon: <Bell className="w-8 h-8" />,
            title: "Real-time Notifications",
            description: "Stay updated with instant notifications for new job postings, referral updates, and mentorship opportunities.",
            gradient: "from-green-secondary to-blue-accent"
        },
        {
            icon: <User className="w-8 h-8" />,
            title: "Profile Optimization",
            description: "AI-driven suggestions to improve your profile, resume quality, and increase your chances of getting noticed.",
            gradient: "from-navy-deep to-green-bright"
        }
    ];

    return (
        <section id="features" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                        Powerful Features for Success
                    </h2>
                    <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                        Everything you need to connect, grow, and succeed in your career journey
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-xl transition-all duration-300 hover-scale border-border/40 hover:border-blue-accent/40"
                        >
                            <CardHeader className="text-center pb-4">
                                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">
                                        {feature.icon}
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-foreground/60 text-center leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
