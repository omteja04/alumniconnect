
import React from 'react';
import { StudentProfile } from '@/components/StudentProfile';
import { Header } from '@/components/Header';

const StudentProfilePage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <StudentProfile />
        </div>
    );
};

export default StudentProfilePage;
