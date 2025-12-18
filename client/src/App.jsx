/**
 * App.jsx
 * 
 * Main Application Component
 * - Wraps entire app in <AuthProvider> for global state.
 * - Manages routing via React Router.
 */

import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { LoaderProvider } from './context/LoaderContext';
import GlobalLoader from './components/GlobalLoader';
import AxiosInterceptor from './components/AxiosInterceptor';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import Book from './pages/Book';
import BookSiteVisit from './pages/BookSiteVisit';
import BlogPage from './pages/BlogPage';
import Services from './pages/Services';
import WhyUsPage from './pages/WhyUsPage';
import FAQPage from './pages/FAQPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers'; // [NEW]
import AdminBookings from './pages/AdminBookings'; // [NEW]
import AdminPainters from './pages/AdminPainters'; // [NEW]
import ComingSoon from './pages/ComingSoon'; // [NEW]
import InteriorPainting from './pages/services/InteriorPainting';
import ExteriorPainting from './pages/services/ExteriorPainting';
import RentalPainting from './pages/services/RentalPainting';
import Waterproofing from './pages/services/Waterproofing';
import WoodFinishes from './pages/services/WoodFinishes';
import TexturePainting from './pages/services/TexturePainting';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import NotFound from './pages/NotFound';
import { AuthProvider } from './hooks/useAuth.jsx';
import useAuth from './hooks/useAuth.jsx';

// Helper component for Protected Routes
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // Global Loader handles the visuals
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (adminOnly && !user.isAdmin) return <div>Access Denied</div>;
  return children;
};


// Main App Structure
function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - No Global Layout */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/painters"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPainters />
            </ProtectedRoute>
          }
        />

        {/* Public/App Routes - Wrapped in Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />

              <Route path="/book" element={<Book />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<BlogPage />} />

              {/* Service Detail Routes */}
              <Route path="/services/Interior-Painting" element={<InteriorPainting />} />
              <Route path="/services/Exterior-Painting" element={<ExteriorPainting />} />
              <Route path="/services/Rental-Painting" element={<RentalPainting />} />
              <Route path="/services/Waterproofing" element={<Waterproofing />} />
              <Route path="/services/Wood-Finishes" element={<WoodFinishes />} />
              <Route path="/services/Texture-Painting" element={<TexturePainting />} />

              <Route path="/why-us" element={<WhyUsPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/estimate" element={<ComingSoon type="estimate" />} />
              <Route path="/ios-app" element={<ComingSoon type="ios" />} />
              <Route path="/android-app" element={<ComingSoon type="android" />} />
              <Route path="/calculator" element={<ComingSoon type="calculator" />} />
              <Route path="/visualizer" element={<ComingSoon type="visualizer" />} />

              {/* Protected Routes */}
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-site-visit"
                element={
                  <ProtectedRoute>
                    <BookSiteVisit />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </>
  );
}



function App() {
  return (
    <LoaderProvider>
      <AxiosInterceptor />
      <GlobalLoader />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
