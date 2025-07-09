import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Card, CardContent, TextField, Button, Typography, Box, Alert, Divider, Container
} from '@mui/material';
import { Google } from '@mui/icons-material';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerWithBackend, loginWithGoogle } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await registerWithBackend(form);
    
    if (result.success) {
      setMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/home'), 1000);
    } else {
      setMessage(result.error || 'Registration failed');
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage('');

    const result = await loginWithGoogle();
    
    if (result.success) {
      setMessage('Google registration successful! Redirecting...');
      setTimeout(() => navigate('/home'), 1000);
    } else {
      setMessage(result.error || 'Google registration failed');
    }
    
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" mt={6}>
        <Card sx={{ maxWidth: 400, p: 3, width: '100%' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Create Account
            </Typography>
            
            {message && (
              <Alert severity={message.includes('successful') ? 'success' : 'error'} sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
                type="email"
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
                type="password"
              />
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                disabled={loading}
                sx={{ mt: 2, py: 1.5 }}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </form>
            
            <Divider sx={{ my: 3 }}>or</Divider>
            
            {/* Google Sign-Up Button */}
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
              {loading ? 'Signing up...' : 'Continue with Google'}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <Button component={Link} to="/login" size="small" sx={{ textTransform: 'none' }}>
                Login here
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
