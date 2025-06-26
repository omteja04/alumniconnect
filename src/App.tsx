import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import AlumniDashboardPage from "./pages/AlumniDashboardPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import AlumniProfilePage from "./pages/AlumniProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route 
                  path="/student-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student-profile" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/alumni-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="alumni">
                      <AlumniDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/alumni-profile" 
                  element={
                    <ProtectedRoute requiredRole="alumni">
                      <AlumniProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;