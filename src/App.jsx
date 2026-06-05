import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ExamPage from './pages/ExamPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/exam/:examId" element={<ExamPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin" element={
  <AdminRoute>
    <AdminPage />
  </AdminRoute>
} />
              <Route path="*" element={<div className="text-center py-20"><h1>404</h1><p>Page not found</p></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;