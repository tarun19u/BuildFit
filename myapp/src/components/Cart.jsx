import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../slices/CartSlice';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Divider,
  Paper,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCartOutlined,
  CreditCard,
  Close
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = ({ onClose }) => {
  const { items, total, itemCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    // Navigate to payment page with cart data
    navigate('/payment', {
      state: {
        cartItems: items,
        total: total,
        itemCount: itemCount,
        userEmail: user?.email,
        paymentType: 'shop_purchase'
      }
    });

    // Close cart drawer if it's open
    if (onClose) onClose();
  };

  const handlePlaceOrder = () => {
    // Here you would typically integrate with a payment processor
    setOrderPlaced(true);
    setTimeout(() => {
      dispatch(clearCart());
      setOrderPlaced(false);
      setCheckoutOpen(false);
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <ShoppingCartOutlined sx={{ mr: 1 }} />
          Shopping Cart
        </Typography>
        {onClose && (
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Cart Items */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {items.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <ShoppingCartOutlined sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Add some products to get started!
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {items.map((item, index) => (
              <Box key={item.id}>
                <ListItem sx={{ py: 2, px: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          ${item.price} each
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                            slotProps={{
                              input: {
                                inputProps: { min: 1, style: { textAlign: 'center', width: '40px' } }
                              }
                            }}
                            sx={{ width: '60px' }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                  />
                  <Box sx={{ textAlign: 'right', ml: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < items.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Box>

      {/* Cart Summary & Actions */}
      {items.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mt: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Items ({itemCount}):</Typography>
              <Typography variant="body1">${total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Shipping:</Typography>
              <Typography variant="body1" color="success.main">FREE</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<CreditCard />}
              onClick={handleCheckout}
              sx={{ py: 1.5, fontWeight: 'bold', textTransform: 'none' }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={() => dispatch(clearCart())}
              sx={{ textTransform: 'none' }}
            >
              Clear Cart
            </Button>
          </Box>
        </Paper>
      )}

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          {orderPlaced ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Order placed successfully! Thank you for your purchase.
            </Alert>
          ) : (
            <Box>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Order Summary</Typography>
                  {items.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Alert severity="info">
                This is a demo checkout. No actual payment will be processed.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutOpen(false)}>Cancel</Button>
          {!orderPlaced && (
            <Button variant="contained" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
