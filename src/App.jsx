import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Diagnostics from './pages/Diagnostics';
import SalesTrends from './pages/SalesTrends';
import Expenses from './pages/Expenses';
import Customers from './pages/Customers';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/sales" element={<SalesTrends />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/customers" element={<Customers />} />
      </Route>
    </Routes>
  );
}