
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { RoleSelectionCard } from '@/components/RoleSelectionCard';
import { FeatureSection } from '@/components/FeatureSection';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to their respective dashboards
  useEffect(() => {
    if (user) {
      if (user.role === 'student') {
        navigate('/student-dashboard');
      } else if (user.role === 'alumni') {
        navigate('/alumni-dashboard');
      }
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    if (user) {
      // User is already logged in, redirect to role selection
      setShowRoleSelection(true);
    } else {
      // User not logged in, show signup modal
      setAuthModalTab('signup');
      setShowAuthModal(true);
    }
  };

  const handleRoleSelect = (role: 'student' | 'alumni') => {
    if (user) {
      // User is already logged in, navigate directly
      if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/alumni-dashboard');
      }
    } else {
      // This shouldn't happen as user should be logged in to reach role selection
      setAuthModalTab('signup');
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setAuthModalTab('signin');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthModalTab('signup');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={handleLogin} onSignupClick={handleSignup} />
      
      {!showRoleSelection ? (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <FeatureSection />
        </>
      ) : (
        <section className="py-20">
          <RoleSelectionCard onRoleSelect={handleRoleSelect} />
        </section>
      )}
      
      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-8">
            How AlumniConnect Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-bright to-green-secondary rounded-full flex items-center justify-center text-navy-deep font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Create Your Profile</h3>
              <p className="text-foreground/70">
                Students upload resumes and skills, alumni share their experience and current roles
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-accent to-navy-deep rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Matching</h3>
              <p className="text-foreground/70">
                Our intelligent system matches students with relevant opportunities and mentors
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-secondary to-blue-accent rounded-full flex items-center justify-center text-navy-deep font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Connect & Succeed</h3>
              <p className="text-foreground/70">
                Get referred, find mentorship, and advance your career with alumni support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-8">
            About AlumniConnect
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-8">
            AlumniConnect bridges the gap between ambitious students and experienced alumni. 
            Our platform leverages artificial intelligence to create meaningful connections that 
            drive career growth and success. Whether you're a student seeking your next opportunity 
            or an alumni looking to give back, we make networking simple and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-secondary text-navy-deep hover:opacity-90 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover-scale"
            >
              Join Our Community
            </button>
            <button className="border border-blue-accent/30 hover:border-blue-accent text-blue-accent hover:bg-blue-accent/10 px-8 py-3 rounded-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/40 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gradient">AlumniConnect</h3>
              <p className="text-foreground/70 text-sm">
                Connecting students and alumni for career success through AI-powered networking.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Platform</h4>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Support</h4>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2024 AlumniConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Index;
