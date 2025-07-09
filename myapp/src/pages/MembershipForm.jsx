import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MembershipForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    membershipType: '',
    goals: '',
    agreeToTerms: false
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email ||
        !formData.phone || !formData.age || !formData.membershipType || !formData.agreeToTerms) {
      alert('Please fill in all required fields and agree to terms');
      return;
    }

    console.log('Form submitted:', formData);

    // Navigate to payment page with membership data
    navigate('/payment', {
      state: {
        userId: Date.now(), // Generate temporary user ID
        plan: formData.membershipType,
        email: formData.email,
        userInfo: formData,
        paymentType: 'membership_purchase'
      }
    });
  };



  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 4,
            fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Join BUILDFIT Today
        </Typography>
        
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mb: 4, color: '#666' }}
        >
          Fill out the form below to start your fitness transformation journey
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Membership Type</InputLabel>
                <Select
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  label="Membership Type"
                >
                  <MenuItem value="basic">Basic - $29/month</MenuItem>
                  <MenuItem value="premium">Premium - $49/month</MenuItem>
                  <MenuItem value="elite">Elite - $79/month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fitness Goals"
                name="goals"
                multiline
                rows={3}
                value={formData.goals}
                onChange={handleChange}
                placeholder="Tell us about your fitness goals and what you want to achieve..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                }
                label="I agree to the terms and conditions and privacy policy"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/home')}
                  sx={{
                    fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#0b602a',
                    color: 'white',
                    fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif',
                    fontWeight: 'bold',
                    padding: '12px 32px',
                    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#0a5025',
                      transform: 'scale(0.95)'
                    }
                  }}
                >
                  Proceed to Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default MembershipForm;
