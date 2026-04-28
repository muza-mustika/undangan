import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BuatUndangan from './pages/BuatUndangan';
import DaftarTamu from './pages/DaftarTamu';
import Login from './pages/Login';
import CreateInvitation from './pages/undangan/pernikahan/create';
import ViewInvitation from './pages/undangan/pernikahan/view';
import PublicInvitation from './pages/PublicInvitation';
import UndanganPernikahan from './pages/undangan/pernikahan/index';
import UndanganKhitanan from './pages/undangan/khitanan/index';
import UndanganUlangTahun from './pages/undangan/ulang-tahun/index';
import UndanganCustom from './pages/undangan/custom/index';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!token && !!user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Preview routes - without MainLayout (must be first) */}
        <Route path="/preview/:category/:id" element={isAuthenticated ? <ViewInvitation /> : <Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/:username" element={<PublicInvitation />} />
        <Route path="/:username/:guest" element={<PublicInvitation />} />

        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/buat-undangan" element={isAuthenticated ? <BuatUndangan /> : <Navigate to="/login" replace />} />
          <Route path="/daftar-tamu" element={isAuthenticated ? <DaftarTamu /> : <Navigate to="/login" replace />} />
          <Route path="/undangan/pernikahan" element={isAuthenticated ? <UndanganPernikahan /> : <Navigate to="/login" replace />} />
          <Route path="/undangan/khitanan" element={isAuthenticated ? <UndanganKhitanan /> : <Navigate to="/login" replace />} />
          <Route path="/undangan/ulang-tahun" element={isAuthenticated ? <UndanganUlangTahun /> : <Navigate to="/login" replace />} />
          <Route path="/undangan/custom" element={isAuthenticated ? <UndanganCustom /> : <Navigate to="/login" replace />} />
          <Route path="/undangan/pernikahan/create" element={isAuthenticated ? <CreateInvitation /> : <Navigate to="/login" replace />} />
          <Route path="/undangan/pernikahan/:id" element={isAuthenticated ? <ViewInvitation /> : <Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
