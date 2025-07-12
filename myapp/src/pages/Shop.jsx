import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/CartSlice';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Rating,
  IconButton,
  Badge,
  Drawer,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Dialog,
  Paper,
  Box
} from '@mui/material';
import {
  AddShoppingCart,
  ShoppingCart,
  Inventory
} from '@mui/icons-material';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';
const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { itemCount } = useSelector((state) => state.cart);
  const navigate= useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);
  const [inventory, setInventory] = useState({});
  const [loadingStock, setLoadingStock] = useState(true);
  const [stockErrors, setStockErrors] = useState({});

  const checkInventory = async (productId) => {
    try {
      const res = await fetch(`https://buildfit.onrender.com/api/inventory/${productId}`);
      return await res.json();
    } catch {
      return { available: false, quantity: 0, isLowStock: false };
    }
  };

  const loadInventory = async () => {
    setLoadingStock(true);
    try {
      const res = await fetch('https://buildfit.onrender.com/api/inventory');
      const data = await res.json();
      if (data.success) setInventory(data.inventory);
    } catch (e) {
      console.error('Failed to load inventory:', e);
    } finally {
      setLoadingStock(false);
    }
  };

  const handleAddToCart = async (product) => {
    const stockData = await checkInventory(product.id);

    if (!stockData.available || stockData.quantity < 1) {
      setStockErrors((prev) => ({ ...prev, [product.id]: 'Out of stock' }));
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/inventory/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      const result = await res.json();

      if (result.success) {
        dispatch(addToCart(product));
        setAddedProduct(product.name);
        setSnackbarOpen(true);
        setStockErrors((prev) => ({ ...prev, [product.id]: null }));
        loadInventory();
      } else {
        setStockErrors((prev) => ({ ...prev, [product.id]: result.error || 'Reservation failed' }));
      }
    } catch {
      setStockErrors((prev) => ({ ...prev, [product.id]: 'Failed to reserve item' }));
    }
  };

  const getStockStatus = (productId) => {
    const stock = inventory[productId];
    if (!stock) return { available: false, message: 'Checking stock...', color: 'text.secondary' };
    if (stock.quantity === 0) return { available: false, message: 'Out of Stock', color: 'error.main' };
    if (stock.isLowStock) return { available: true, message: `Only ${stock.quantity} left!`, color: 'warning.main' };
    return { available: true, message: 'In Stock', color: 'success.main' };
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (products.length) loadInventory();
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loadingStock) loadInventory();
    }, 30000);
    return () => clearInterval(interval);
  }, [loadingStock]);

  return (
    <Paper
      elevation={0}
      square
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff'
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#1f1f1f' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fitness Shop
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3
        }}
      >
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#1e1e1e',
                  color: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    objectFit: 'contain',
                    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
                    backgroundColor: '#2a2a2a',
                    cursor: 'zoom-in'
                  }}
                  onClick={() => setZoomedImage(product.image)}
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                  }}
                />

                <CardContent sx={{ flexGrow: 1,p:2 }}>
                  <Box sx={{ flex:1,overflowY:'auto',display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Chip
                      label={product.category}
                      size="small"
                      variant="outlined"
                      sx={{
                        color: '#fff',
                        borderColor: '#90caf9',
                        backgroundColor: 'transparent'
                      }}
                    />
                  </Box>

                  <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1, color: '#aaa' }}>
                      ({product.rating})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#90caf9', fontWeight: 'bold' }}>
                      ${product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Inventory sx={{ fontSize: 18, mr: 0.5, color: getStockStatus(product.id).color }} />
                      <Typography variant="body2" sx={{ color: getStockStatus(product.id).color }}>
                        {loadingStock ? 'Checking...' : getStockStatus(product.id).message}
                      </Typography>
                    </Box>
                  </Box>

                  {stockErrors[product.id] && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {stockErrors[product.id]}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!getStockStatus(product.id).available || loadingStock}
                    startIcon={<AddShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      py: 1.3,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      }
                    }}
                  >
                    {loadingStock
                      ? 'Checking Stock...'
                      : getStockStatus(product.id).available
                        ? 'Add to Cart'
                        : 'Out of Stock'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Zoom Image Dialog */}
      <Dialog
        open={Boolean(zoomedImage)}
        onClose={() => setZoomedImage(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
      >
        <img
          src={zoomedImage}
          alt="Zoomed"
          style={{
            maxHeight: '90vh',
            maxWidth: '100%',
            objectFit: 'contain',
            cursor: 'zoom-out'
          }}
          onClick={() => setZoomedImage(null)}
        />
      </Dialog>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            maxWidth: '100vw',
            backgroundColor: '#1f1f1f',
            color: '#fff'
          }
        }}
      >
        <Cart onClose={() => setCartOpen(false)} />
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {addedProduct} added to cart!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Shop;
