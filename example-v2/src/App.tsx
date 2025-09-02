// SRP: Main application with React Router and Layout integration
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { FreePlayPage } from '@/pages/demo/FreePlayPage';
import { VSComputerPage } from '@/pages/demo/VSComputerPage';
import { ConnectedGamePage } from '@/pages/chess/ConnectedGamePage';
import { PuzzlePage } from '@/pages/chess/PuzzlePage';
import { useAuthStore } from '@/stores/authStore';

function App() {
  const { checkAuthStatus } = useAuthStore();

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without layout */}
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        
        {/* All other routes use the layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route 
                path="/" 
                element={<HomePage />} 
              />
              <Route 
                path="/free-play" 
                element={<FreePlayPage />} 
              />
              <Route 
                path="/vs-computer" 
                element={<VSComputerPage />} 
              />
              <Route 
                path="/connected" 
                element={
                  <AuthGuard>
                    <ConnectedGamePage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/puzzles" 
                element={
                  <AuthGuard>
                    <PuzzlePage />
                  </AuthGuard>
                } 
              />
              {/* Redirect any unknown routes to home */}
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
