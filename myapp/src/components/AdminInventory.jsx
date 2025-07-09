import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Inventory,
  Warning,
  CheckCircle,
  Error,
  Refresh
} from '@mui/icons-material';

const AdminInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateDialog, setUpdateDialog] = useState({ open: false, productId: null, currentStock: 0 });
  const [newStock, setNewStock] = useState('');
  const [updateReason, setUpdateReason] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [lowStockItems, setLowStockItems] = useState([]);

  // Load inventory data
  const loadInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/inventory');
      const data = await response.json();
      if (data.success) {
        setInventory(data.inventory);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
      setMessage({ type: 'error', text: 'Failed to load inventory' });
    } finally {
      setLoading(false);
    }
  };

  // Load low stock items
  const loadLowStockItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/inventory/alerts/low-stock');
      const data = await response.json();
      if (data.success) {
        setLowStockItems(data.lowStockItems);
      }
    } catch (error) {
      console.error('Error loading low stock items:', error);
    }
  };

  // Update stock
  const handleUpdateStock = async () => {
    if (!newStock || isNaN(newStock) || parseInt(newStock) < 0) {
      setMessage({ type: 'error', text: 'Please enter a valid stock quantity' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/inventory/${updateDialog.productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          quantity: parseInt(newStock), 
          reason: updateReason || 'Admin stock update' 
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Stock updated successfully' });
        setUpdateDialog({ open: false, productId: null, currentStock: 0 });
        setNewStock('');
        setUpdateReason('');
        loadInventory();
        loadLowStockItems();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update stock' });
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      setMessage({ type: 'error', text: 'Failed to update stock' });
    }
  };

  // Open update dialog
  const openUpdateDialog = (productId, currentStock) => {
    setUpdateDialog({ open: true, productId, currentStock });
    setNewStock(currentStock.toString());
    setUpdateReason('');
  };

  // Get stock status color and icon
  const getStockStatus = (stock) => {
    if (stock.quantity === 0) {
      return { color: 'error', icon: <Error />, label: 'Out of Stock' };
    } else if (stock.isLowStock) {
      return { color: 'warning', icon: <Warning />, label: 'Low Stock' };
    } else {
      return { color: 'success', icon: <CheckCircle />, label: 'In Stock' };
    }
  };

  useEffect(() => {
    loadInventory();
    loadLowStockItems();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadInventory();
      loadLowStockItems();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Inventory sx={{ mr: 2 }} />
          Inventory Management
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => {
            loadInventory();
            loadLowStockItems();
          }}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {/* Message Alert */}
      {message.text && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 3 }}
          onClose={() => setMessage({ type: '', text: '' })}
        >
          {message.text}
        </Alert>
      )}

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card sx={{ mb: 3, backgroundColor: '#fff3cd', borderColor: '#ffeaa7' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#856404' }}>
              ⚠️ Low Stock Alerts ({lowStockItems.length})
            </Typography>
            <Grid container spacing={2}>
              {lowStockItems.map(item => (
                <Grid item xs={12} sm={6} md={4} key={item.productId}>
                  <Chip
                    label={`${item.productName}: ${item.availableStock} left`}
                    color="warning"
                    variant="outlined"
                    onClick={() => openUpdateDialog(item.productId, item.availableStock)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Available Stock</TableCell>
              <TableCell align="center">Reserved</TableCell>
              <TableCell align="center">Total Stock</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(inventory).map((stock) => {
              const status = getStockStatus(stock);
              return (
                <TableRow key={stock.productId}>
                  <TableCell>{stock.productId}</TableCell>
                  <TableCell>Product {stock.productId}</TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" color={status.color}>
                      {stock.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{stock.reserved}</TableCell>
                  <TableCell align="center">{stock.totalStock}</TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={status.icon}
                      label={status.label}
                      color={status.color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => openUpdateDialog(stock.productId, stock.totalStock)}
                    >
                      Update Stock
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Stock Dialog */}
      <Dialog open={updateDialog.open} onClose={() => setUpdateDialog({ open: false, productId: null, currentStock: 0 })}>
        <DialogTitle>Update Stock - Product {updateDialog.productId}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Current Stock: {updateDialog.currentStock}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="New Stock Quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            inputProps={{ min: 0 }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Reason for Update"
            fullWidth
            variant="outlined"
            value={updateReason}
            onChange={(e) => setUpdateReason(e.target.value)}
            placeholder="e.g., New shipment received, Stock correction"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialog({ open: false, productId: null, currentStock: 0 })}>
            Cancel
          </Button>
          <Button onClick={handleUpdateStock} variant="contained">
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminInventory;
