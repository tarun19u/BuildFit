const express = require('express');
const router = express.Router();
const { InventoryManager } = require('../inventory');

// GET /api/inventory - Get all inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await InventoryManager.getAllStock();
    res.json({
      success: true,
      inventory
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inventory'
    });
  }
});

// GET /api/inventory/:productId - Get stock for specific product
router.get('/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const stock = await InventoryManager.getStock(productId);
    
    res.json({
      success: true,
      ...stock
    });
  } catch (error) {
    console.error('Error checking stock:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check stock',
      productId: parseInt(req.params.productId),
      available: false,
      quantity: 0
    });
  }
});

// POST /api/inventory/reserve - Reserve stock (add to cart)
router.post('/reserve', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID or quantity'
      });
    }

    const result = await InventoryManager.reserveStock(productId, quantity);
    
    res.json({
      success: true,
      message: 'Stock reserved successfully',
      ...result
    });
  } catch (error) {
    console.error('Error reserving stock:', error);
    
    if (error.message === 'Insufficient stock') {
      return res.status(409).json({
        success: false,
        error: 'Insufficient stock available'
      });
    }
    
    if (error.message === 'Product not found') {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to reserve stock'
    });
  }
});

// POST /api/inventory/release - Release reserved stock (remove from cart)
router.post('/release', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID or quantity'
      });
    }

    const result = await InventoryManager.releaseStock(productId, quantity);
    
    res.json({
      success: true,
      message: 'Stock released successfully',
      ...result
    });
  } catch (error) {
    console.error('Error releasing stock:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to release stock'
    });
  }
});

// POST /api/inventory/purchase - Complete purchase (checkout)
router.post('/purchase', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid items array'
      });
    }

    const results = await InventoryManager.completePurchase(items);
    
    res.json({
      success: true,
      message: 'Purchase completed successfully',
      results
    });
  } catch (error) {
    console.error('Error completing purchase:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete purchase'
    });
  }
});

// PUT /api/inventory/:productId - Update stock (admin only)
router.put('/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const { quantity, reason = 'Manual stock update' } = req.body;

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity cannot be negative'
      });
    }

    const result = await InventoryManager.updateStock(productId, quantity, reason);
    
    res.json({
      success: true,
      message: 'Stock updated successfully',
      ...result
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update stock'
    });
  }
});

// GET /api/inventory/low-stock - Get low stock items
router.get('/alerts/low-stock', async (req, res) => {
  try {
    const lowStockItems = await InventoryManager.getLowStockItems();
    
    res.json({
      success: true,
      lowStockItems,
      count: lowStockItems.length
    });
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch low stock items'
    });
  }
});

// GET /api/inventory/history/:productId - Get stock history for product
router.get('/history/:productId', async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const history = await InventoryManager.getStockHistory(productId);
    
    res.json({
      success: true,
      productId,
      history
    });
  } catch (error) {
    console.error('Error fetching stock history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock history'
    });
  }
});

module.exports = router;
