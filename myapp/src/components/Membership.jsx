import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Snackbar
} from "@mui/material";
import { membershipAPI, utils } from '../services/membershipAPI';

const Membership = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
    goal: "",
    experience: "",
    preferredTime: "",
    medicalConditions: "",
    address: "",
    emergencyContact: "",
    membershipPlan: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (formData.height && formData.weight) {
      const bmi = utils.calculateBMI(formData.height, formData.weight);
      setFormData((prev) => ({
        ...prev,
        bmi: bmi,
      }));
    }
  }, [formData.height, formData.weight]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phone || !formData.age ||
        !formData.gender || !formData.height || !formData.weight || !formData.emergencyContact ||
        !formData.membershipPlan) {
        throw new Error('Please fill in all required fields');
      }

      if (!utils.validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Option 1: Try to send to backend, but proceed to payment regardless
      let memberData = null;
      try {
        console.log('🔄 Attempting to save member data to backend...');
        const response = await membershipAPI.createMember(formData);
        if (response.success) {
          memberData = response.data;
          console.log('✅ Member data saved successfully:', memberData);
        }
      } catch (backendError) {
        console.warn('⚠️ Backend save failed, proceeding to payment anyway:', backendError.message);
        // Don't throw error - continue to payment
      }

      // Always proceed to payment page with form data
      console.log('🚀 Proceeding to payment page...');
      navigate('/payment', {
        state: {
          userId: memberData?.userId || `TEMP_${Date.now()}`,
          plan: formData.membershipPlan,
          email: formData.email,
          userInfo: formData,
          paymentType: 'membership_purchase',
          memberData: memberData // Include backend response if available
        }
      });

    } catch (error) {
      console.error('❌ Form validation error:', error);
      setNotification({
        open: true,
        message: error.message || 'Please check your form data',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "900px",
        margin: "auto",
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
        BUILDFIT Gym Membership Form
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Gender"
            name="gender"
            select
            value={formData.gender}
            onChange={handleChange}
            required
            fullWidth
            SelectProps={{ displayEmpty: true }}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled><em>Select Gender</em></MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            
          </TextField>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="BMI" name="bmi" value={formData.bmi} InputProps={{ readOnly: true }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Fitness Goal"
            name="goal"
            select
            value={formData.goal}
            onChange={handleChange}
            required
            fullWidth
            SelectProps={{ displayEmpty: true }}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled><em>Select Fitness Goal</em></MenuItem>
            <MenuItem value="Lose Weight">Lose Weight</MenuItem>
            <MenuItem value="Gain Muscle">Gain Muscle</MenuItem>
            <MenuItem value="Improve Endurance">Improve Endurance</MenuItem>
            <MenuItem value="Stay Fit">Stay Fit</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Experience Level"
            name="experience"
            select
            value={formData.experience}
            onChange={handleChange}
            required
            fullWidth
            SelectProps={{ displayEmpty: true }}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled><em>Select Experience</em></MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Preferred Workout Time"
            name="preferredTime"
            select
            value={formData.preferredTime}
            onChange={handleChange}
            fullWidth
            SelectProps={{ displayEmpty: true }}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled><em>Select Time</em></MenuItem>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
            <MenuItem value="Anytime">Anytime</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Emergency Contact Number"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Membership Plan"
            name="membershipPlan"
            select
            value={formData.membershipPlan}
            onChange={handleChange}
            required
            fullWidth
            SelectProps={{ displayEmpty: true }}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="" disabled><em>Select Plan</em></MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Annual">Annual</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Medical Conditions (if any)"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            placeholder="E.g. asthma, heart conditions, injuries..."
          />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={loading}
            sx={{
              backgroundColor: "#0b602a",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "10px 30px",
              '&:hover': { backgroundColor: '#094d23' }
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                Submitting...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Membership;
