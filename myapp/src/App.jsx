
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProgramsPage from './pages/ProgramsPage';
import { Container, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Shop from './pages/Shop';
import Home from './pages/Home';
import MembershipForm from './pages/MembershipForm';
import Membership from './components/Membership';
import MembershipData from './components/MembershipData';
import ConnectionTest from './components/ConnectionTest';
import AboutUs from './pages/AboutUs';
import TestimonialsBook from './pages/Testimonials';
import Register from './auth/Register';
import Login from './auth/Login';
import Cart from './components/Cart';
import AdminInventory from './components/AdminInventory';

import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <NavBar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } />

            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/membership" element={
              <ProtectedRoute>
                <MembershipForm />
              </ProtectedRoute>
            } />
            <Route path="/membership-form" element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            } />
            <Route path="/membership-data" element={
              <ProtectedRoute>
                <MembershipData />
              </ProtectedRoute>
            } />
            <Route path="/test-connection" element={
              <ProtectedRoute>
                <ConnectionTest />
              </ProtectedRoute>
            } />
            <Route path="/programs" element={
              <ProtectedRoute>
                <ProgramsPage />
              </ProtectedRoute>
            } />
            <Route path="/about-us" element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            } />
            <Route path="/testimonials" element={
              <ProtectedRoute>
                <TestimonialsBook />
              </ProtectedRoute>
            } />
            <Route path="/shop" element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/admin/inventory" element={
              <ProtectedRoute>
                <AdminInventory />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
