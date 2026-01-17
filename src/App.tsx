import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { supabase } from './lib/supabase';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import LoginForm from './components/LoginForm';

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      // 1. Check if Supabase still considers the session valid
      const { data: { session } } = await supabase.auth.getSession();
      
      // 2. Check SessionStorage (The FAFSA 'Amnesia' check)
      const stored = sessionStorage.getItem('currentUser');
      
      if (session && stored) {
        setCurrentUser(stored);
        setIsLoggedIn(true);
      } else {
        // If the tab was closed, we force a logout even if Supabase remembers
        handleLogout();
      }
    };
    checkSession();
  }, []);

  const handleLogin = (email: string) => {
    sessionStorage.setItem('currentUser', email);
    setCurrentUser(email);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<Index currentUser={currentUser} onLogout={handleLogout} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;