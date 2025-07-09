import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../slices/CartSlice';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  CreditCard,
  Security,
  ShoppingCart,
  CheckCircle
} from '@mui/icons-material';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get data from navigation state
  const { cartItems, total, itemCount, userEmail, paymentType, userId, plan } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit_card'
  });
  const [errors, setErrors] = useState({});

  // Redirect if no payment data
  useEffect(() => {
    if (!total && !plan) {
      navigate('/shop');
    }
  }, [total, plan, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!paymentData.cardNumber.trim() || paymentData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    
    if (!paymentData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    
    if (!paymentData.cvv.trim() || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV is required';
    }
    
    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order data
      const orderData = {
        paymentType,
        amount: total || (plan === 'basic' ? 29.99 : plan === 'premium' ? 49.99 : 79.99),
        items: cartItems || [{ name: `${plan} Membership`, quantity: 1 }],
        userEmail,
        userId,
        plan,
        paymentMethod: paymentData.paymentMethod,
        timestamp: new Date().toISOString()
      };
      
      // Here you would typically send to your backend
      console.log('Processing payment:', orderData);
      
      // Clear cart if it's a shop purchase
      if (paymentType === 'shop_purchase') {
        dispatch(clearCart());
      }
      
      // Navigate to success page
      navigate('/payment-success', {
        state: {
          orderData,
          paymentType
        }
      });
      
    } catch (error) {
      console.error('Payment failed:', error);
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        <CreditCard sx={{ mr: 1, verticalAlign: 'middle' }} />
        Secure Payment
      </Typography>

      <Grid container spacing={4}>
        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ShoppingCart sx={{ mr: 1, verticalAlign: 'middle' }} />
                Order Summary
              </Typography>
              
              {cartItems ? (
                // Shop purchase
                <>
                  {cartItems.map((item, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{item.name} x{item.quantity}</Typography>
                        <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                      </Box>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">${total?.toFixed(2)}</Typography>
                  </Box>
                </>
              ) : (
                // Membership purchase
                <>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">{plan} Membership</Typography>
                      <Typography variant="body2">
                        ${plan === 'basic' ? '29.99' : plan === 'premium' ? '49.99' : '79.99'}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">
                      ${plan === 'basic' ? '29.99' : plan === 'premium' ? '49.99' : '79.99'}
                    </Typography>
                  </Box>
                </>
              )}
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Security sx={{ mr: 1 }} />
                Your payment is secured with 256-bit SSL encryption
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            
            {errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.submit}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      name="paymentMethod"
                      value={paymentData.paymentMethod}
                      onChange={handleInputChange}
                      label="Payment Method"
                    >
                      <MenuItem value="credit_card">Credit Card</MenuItem>
                      <MenuItem value="debit_card">Debit Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    name="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={handleInputChange}
                    error={!!errors.cardholderName}
                    helperText={errors.cardholderName}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    inputProps={{ maxLength: 19 }}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    placeholder="123"
                    inputProps={{ maxLength: 4 }}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Billing Address"
                    name="billingAddress"
                    value={paymentData.billingAddress}
                    onChange={handleInputChange}
                    error={!!errors.billingAddress}
                    helperText={errors.billingAddress}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={paymentData.city}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={paymentData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(-1)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                      sx={{ minWidth: 150 }}
                    >
                      {loading ? 'Processing...' : 'Complete Payment'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;
