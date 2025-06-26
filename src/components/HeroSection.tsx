
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-accent/5"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-bright rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-green-secondary rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Connect <span className="text-gradient">Alumni</span>
            <br />
            <span className="text-gradient">& Students</span> Seamlessly
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered platform for job referrals, mentorship, and career growth. 
            Where students find opportunities and alumni make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-secondary text-navy-deep hover:opacity-90 font-semibold px-8 py-4 text-lg hover-scale"
            >
              Get Started Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-accent/30 hover:border-blue-accent text-blue-accent hover:bg-blue-accent/10 px-8 py-4 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover-scale">
            <div className="text-3xl font-bold text-gradient mb-2">10K+</div>
            <div className="text-foreground/70">Active Alumni</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover-scale">
            <div className="text-3xl font-bold text-gradient mb-2">5K+</div>
            <div className="text-foreground/70">Students Placed</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40 hover-scale">
            <div className="text-3xl font-bold text-gradient mb-2">95%</div>
            <div className="text-foreground/70">Success Rate</div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-foreground/50" />
        </div>
      </div>
    </section>
  );
};
