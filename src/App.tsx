import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import 'normalize.css';
import EmployeeManagerPage from './pages/EmployeeManagerPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-management" element={<EmployeeManagerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
