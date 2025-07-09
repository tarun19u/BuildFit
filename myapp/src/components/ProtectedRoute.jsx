import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // If route requires auth but user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route is for non-authenticated users (like login page) but user is authenticated
  if (!requireAuth && isAuthenticated()) {
    // Redirect to home or dashboard
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
