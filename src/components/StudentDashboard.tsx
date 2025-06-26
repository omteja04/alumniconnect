import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookUser,
    Bell,
    User,
    File,
    MessageCircle,
    Briefcase,
} from "lucide-react";
import { StudentJobBoard } from "@/components/student/StudentJobBoard";
import { StudentMessages } from "@/components/student/StudentMessages";
// import { /*…*/ BookOpen } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState("overview");
    // const [activeTab, setActiveTab] = useState("overview");
    // ── Mentorship form state ──
    const [studentName, setStudentName] = useState("");
    const [alumniName, setAlumniName] = useState("");
    const [topic, setTopic] = useState("");
    const [preferredDate, setPreferredDate] = useState("");

    // Submit handler
    const handleMentorshipSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🔥 handleMentorshipSubmit fired", {
            studentName,
            alumniName,
            topic,
            preferredDate,
        });
        try {
            const res = await fetch("http://localhost:4000/mentorship", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa("your_username:your_password"),
                },
                body: JSON.stringify({
                    u_student: studentName,
                    u_alumni: alumniName,
                    u_session_topic: topic,
                    u_requested_date: preferredDate,
                    u_confirmed_date: preferredDate
                }),
            });
            const data = await res.json();
            console.log("Success:", data);
            setActiveTab("overview"); // go back to overview on success
        } catch (err) {
            console.error("Error:", err);
        }
    };

    // Mock data for demonstration
    const recommendedJobs = [
        {
            id: 1,
            title: "Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            type: "Full-time",
            match: 95,
            posted: "2 days ago",
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Design Studio",
            location: "New York, NY",
            type: "Remote",
            match: 88,
            posted: "1 week ago",
        },
        {
            id: 3,
            title: "Software Engineer",
            company: "StartupXYZ",
            location: "Austin, TX",
            type: "Hybrid",
            match: 82,
            posted: "3 days ago",
        },
    ];

    const activeAlumni = [
        {
            id: 1,
            name: "Shaik Muzna Jawhar",
            company: "Servicenow",
            position: "Associate Technical Engineer",
            department: "Computer Science",
            availability: "Available",
            role: "Alumni",
            referredJobRole: "ServiceNow Developer Intern"
        },
        {
            id: 2,
            name: "Venkat Polisetti",
            company: "Servicenow",
            position: "Associate Technical Support Engineer",
            department: "Computer Science",
            availability: "Busy",
            role: "Alumni",
            referredJobRole: "ServiceNow Technical Support Engineer	Intern"
        }
    ];


    if (activeTab === "jobs") {
        return <StudentJobBoard />;
    }

    //   if (activeTab === "messages") {
    //     return <StudentMessages />;
    //   }
    if (activeTab === "mentorship") {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <form
                    onSubmit={handleMentorshipSubmit}
                    className="w-full max-w-md bg-white text-black p-8 rounded-lg shadow"
                >
                    <h2 className="text-2xl font-bold mb-4">Request Mentorship</h2>

                    <label className="block mb-3">
                        <span>Student Name</span>
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                            className="mt-1 block w-full border px-3 py-2 rounded"
                        />
                    </label>

                    <label className="block mb-3">
                        <span>Alumni Name</span>
                        <input
                            type="text"
                            value={alumniName}
                            onChange={(e) => setAlumniName(e.target.value)}
                            required
                            className="mt-1 block w-full border px-3 py-2 rounded"
                        />
                    </label>

                    <label className="block mb-3">
                        <span>Topic</span>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            className="mt-1 block w-full border px-3 py-2 rounded"
                        />
                    </label>

                    <label className="block mb-6">
                        <span>Preferred Date</span>
                        <input
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            required
                            className="mt-1 block w-full border px-3 py-2 rounded"
                        />
                    </label>

                    <div className="flex justify-end space-x-2 text-white">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveTab("overview")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Send Request</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gradient">
                            Student Dashboard
                        </h1>
                        <p className="text-foreground/70 mt-2">
                            Welcome back! Here's your personalized career hub.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            className="border-blue-accent/30 hover:border-blue-accent"
                        >
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                        </Button>
                        <Button className="bg-blue-accent hover:bg-blue-accent/90">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </Button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="jobs" className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Job Board
                        </TabsTrigger>
                        {/* <TabsTrigger value="messages" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Messages
                        </TabsTrigger> */}
                        <TabsTrigger value="mentorship" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Mentorship Request
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card className="border-border/40">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-foreground/60">
                                                Profile Score
                                            </p>
                                            <p className="text-2xl font-bold text-green-bright">
                                                85%
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-bright/20 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-green-bright" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/40">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-foreground/60">Applications</p>
                                            <p className="text-2xl font-bold text-blue-accent">12</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-accent/20 rounded-full flex items-center justify-center">
                                            <File className="w-6 h-6 text-blue-accent" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/40">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-foreground/60">Referrals</p>
                                            <p className="text-2xl font-bold text-green-secondary">
                                                5
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-secondary/20 rounded-full flex items-center justify-center">
                                            <BookUser className="w-6 h-6 text-green-secondary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/40">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-foreground/60">Responses</p>
                                            <p className="text-2xl font-bold text-foreground">3</p>
                                        </div>
                                        <div className="w-12 h-12 bg-foreground/20 rounded-full flex items-center justify-center">
                                            <Bell className="w-6 h-6 text-foreground" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recommended Jobs */}
                            <Card className="border-border/40">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-green-bright rounded-full"></div>
                                        <span>AI Recommended Jobs</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Jobs matched based on your profile and preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {recommendedJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="p-4 rounded-lg border border-border/40 hover:border-blue-accent/40 transition-colors hover-scale"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-sm text-foreground/70">
                                                        {job.company}
                                                    </p>
                                                    <p className="text-sm text-foreground/60">
                                                        {job.location}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-green-bright/20 text-green-bright border-green-bright/30"
                                                >
                                                    {job.match}% match
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="flex items-center space-x-2">
                                                    <Badge variant="outline">{job.type}</Badge>
                                                    <span className="text-xs text-foreground/50">
                                                        {job.posted}
                                                    </span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="bg-blue-accent hover:bg-blue-accent/90"
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => setActiveTab("jobs")}
                                        variant="outline"
                                        className="w-full border-blue-accent/30 hover:border-blue-accent"
                                    >
                                        <Briefcase className="w-4 h-4 mr-2" />
                                        View All Jobs
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Active Alumni */}
                            <Card className="border-border/40">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-blue-accent rounded-full"></div>
                                        <span>Active Alumni</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Connect with alumni in your department
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {activeAlumni.map((alumni) => (
                                        <div
                                            key={alumni.id}
                                            className="p-4 rounded-lg border border-border/40 hover:border-blue-accent/40 transition-colors hover-scale"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{alumni.name}</h3>
                                                    <p className="text-sm text-foreground/70">{alumni.position} @ {alumni.company}</p>
                                                    <p className="text-xs text-foreground/60">Referred Role: <span className="font-medium">{alumni.referredJobRole}</span></p>
                                                    <p className="text-xs text-foreground/60">Role: {alumni.role}</p>
                                                </div>
                                                <Badge
                                                    variant={alumni.availability === "Available" ? "default" : "secondary"}
                                                    className={
                                                        alumni.availability === "Available"
                                                            ? "bg-green-secondary/20 text-green-secondary border-green-secondary/30"
                                                            : "bg-foreground/20 text-foreground/70"
                                                    }
                                                >
                                                    {alumni.availability}
                                                </Badge>
                                            </div>

                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-xs text-foreground/50">{alumni.department}</span>
                                                <div className="space-x-2">
                                                    <Button
                                                        onClick={() => setActiveTab("mentorship")}
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-blue-accent/30 hover:border-blue-accent"
                                                    >
                                                        Mentorship Request
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-secondary hover:bg-green-secondary/90 text-navy-deep"
                                                        onClick={async () => {
                                                            try {
                                                                const response = await fetch('http://localhost:3000/api/referrals', {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVjNDI5MjI0ZGM5N2ZkNmQ1ODEwMDAiLCJpYXQiOjE3NTA5MTQ1MTMsImV4cCI6MTc1MTAwMDkxM30.c1YCsSagnCwA17AMkUsCo4AIHTMTfwr4XaKJ-6kMY64'
                                                                    },
                                                                    body: JSON.stringify({
                                                                        studentName: "Omteja Yallapragada", // From Supabase auth
                                                                        alumniAssigned: alumni.name,
                                                                        jobRole: alumni.referredJobRole,
                                                                        resumeLink: "https://drive.google.com/resume-teja", // replace with dynamic resume URL
                                                                        profileUrl: `https://alumninetwork.com/omteja04`, // replace if needed
                                                                        status: "Pending"
                                                                    })
                                                                });

                                                                const result = await response.json();
                                                                if (response.ok) {
                                                                    alert(`Referral request sent to ${alumni.name} successfully!`);
                                                                } else {
                                                                    alert(`Error: ${result?.error || 'Something went wrong'}`);
                                                                }
                                                            } catch (err) {
                                                                console.error('Referral Error:', err);
                                                                alert('Failed to send referral request.');
                                                            }
                                                        }}
                                                    >
                                                        Request Referral
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        onClick={() => setActiveTab("mentorship")}
                                        variant="outline"
                                        className="w-full border-green-bright/30 hover:border-green-bright"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Message Alumni & Admins
                                    </Button>
                                </CardContent>

                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
