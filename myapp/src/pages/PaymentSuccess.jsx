import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  Grid,
  Chip
} from '@mui/material';
import {
  CheckCircle,
  Download,
  Email,
  Home,
  ShoppingBag,
  FitnessCenter
} from '@mui/icons-material';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());
  
  const { orderData, paymentType } = location.state || {};

  useEffect(() => {
    // Redirect if no order data
    if (!orderData) {
      navigate('/shop');
    }
  }, [orderData, navigate]);

  const handleDownloadReceipt = () => {
    // Create a simple receipt text
    const receiptText = `
BUILDFIT GYM - PAYMENT RECEIPT
==============================
Order Number: ${orderNumber}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

${paymentType === 'shop_purchase' ? 'SHOP PURCHASE' : 'MEMBERSHIP PURCHASE'}
${orderData?.items?.map(item => 
  `${item.name} ${item.quantity ? `x${item.quantity}` : ''}`
).join('\n') || ''}

Total Amount: $${orderData?.amount?.toFixed(2)}
Payment Method: ${orderData?.paymentMethod?.replace('_', ' ').toUpperCase()}

Thank you for your business!
Contact: support@buildfit.com
    `;

    // Create and download the receipt
    const element = document.createElement('a');
    const file = new Blob([receiptText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `BuildFit_Receipt_${orderNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendEmail = () => {
    // In a real app, this would trigger an email send
    alert('Receipt has been sent to your email address!');
  };

  if (!orderData) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        {/* Success Icon */}
        <Box sx={{ mb: 3 }}>
          <CheckCircle 
            sx={{ 
              fontSize: 80, 
              color: 'success.main',
              mb: 2
            }} 
          />
          <Typography variant="h4" gutterBottom color="success.main">
            Payment Successful!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Thank you for your {paymentType === 'shop_purchase' ? 'purchase' : 'membership'}
          </Typography>
        </Box>

        {/* Order Details */}
        <Card elevation={1} sx={{ mb: 3, textAlign: 'left' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="h6" gutterBottom>
                  #{orderNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date & Time
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            {orderData.items?.map((item, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">
                    {item.name} {item.quantity && `x${item.quantity}`}
                  </Typography>
                  <Chip 
                    label={paymentType === 'shop_purchase' ? 'Product' : 'Membership'} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Total Amount Paid:
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ${orderData.amount?.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Payment Method:
              </Typography>
              <Typography variant="body2">
                {orderData.paymentMethod?.replace('_', ' ').toUpperCase()}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Success Messages */}
        {paymentType === 'shop_purchase' ? (
          <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="subtitle1" gutterBottom>
              <ShoppingBag sx={{ mr: 1, verticalAlign: 'middle' }} />
              Your order has been confirmed!
            </Typography>
            <Typography variant="body2">
              • Your items will be prepared for pickup<br/>
              • You'll receive an email confirmation shortly<br/>
              • Estimated pickup time: 2-3 business days
            </Typography>
          </Alert>
        ) : (
          <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="subtitle1" gutterBottom>
              <FitnessCenter sx={{ mr: 1, verticalAlign: 'middle' }} />
              Welcome to BuildFit Gym!
            </Typography>
            <Typography variant="body2">
              • Your membership is now active<br/>
              • Access card will be ready for pickup<br/>
              • Welcome package sent to your email<br/>
              • Visit our front desk to complete setup
            </Typography>
          </Alert>
        )}

        {/* Action Buttons */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Download />}
              onClick={handleDownloadReceipt}
              sx={{ mb: 1 }}
            >
              Download Receipt
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Email />}
              onClick={handleSendEmail}
              sx={{ mb: 1 }}
            >
              Email Receipt
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Home />}
              onClick={() => navigate('/home')}
              sx={{ mb: 1 }}
            >
              Go to Home
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingBag />}
              onClick={() => navigate('/shop')}
              color="secondary"
              sx={{ mb: 1 }}
            >
              Continue Shopping
            </Button>
          </Grid>
        </Grid>

        {/* Footer Note */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          If you have any questions about your {paymentType === 'shop_purchase' ? 'order' : 'membership'}, 
          please contact us at support@buildfit.com or call (555) 123-4567
        </Typography>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
