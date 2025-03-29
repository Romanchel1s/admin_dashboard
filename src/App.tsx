import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import 'normalize.css';
import EmployeeManagerPage from './pages/EmployeeManagerPage';
import Header from './components/Header';
import CredentialsSignInPage from './pages/SignIn';
import { CircularProgress } from '@mui/material';
import { Session } from '@supabase/supabase-js';
import supabase from './api/supabaseClient';

const App: React.FC = () => {

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Подписываемся на изменения авторизации
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  console.log(session);
  
  if (loading) return <CircularProgress />;

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={session? <Dashboard />: <Navigate to="/signin" />} />
        <Route path="/signin" element={<CredentialsSignInPage />} />
        <Route path="/employee-management" element={session? <EmployeeManagerPage />: <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
