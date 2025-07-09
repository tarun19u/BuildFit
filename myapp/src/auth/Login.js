import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Alert,
  Divider
} from '@mui/material';
import { Google } from '@mui/icons-material';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithBackend, loginWithGoogle } = useAuth();

  const from = location.state?.from?.pathname || '/home';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const result = await loginWithBackend(form.email, form.password);

    if (result.success) {
      setMsg('Login successful! Redirecting...');
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } else {
      setMsg(result.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMsg('');

    const result = await loginWithGoogle();

    if (result.success) {
      setMsg('Google login successful! Redirecting...');
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } else {
      setMsg(result.error || 'Google login failed');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
          Sign in
        </Typography>

        {message && (
          <Alert severity={message.includes('successful') || message.includes('Welcome') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
            autoFocus
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </Box>

        {/* Divider */}
        <Box sx={{ my: 3 }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
        </Box>

        {/* Google Login Button */}
        <Button
          variant="outlined"
          fullWidth
          disabled={loading}
          onClick={handleGoogleLogin}
          startIcon={<Google />}
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            borderColor: '#4285f4',
            color: '#4285f4',
            '&:hover': {
              borderColor: '#3367d6',
              backgroundColor: 'rgba(66, 133, 244, 0.04)'
            }
          }}
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </Button>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Button component={Link} to="/register" size="small" sx={{ textTransform: 'none' }}>
            Register here
          </Button>
        </Typography>
      </Card>
    </Container>
  );
}
