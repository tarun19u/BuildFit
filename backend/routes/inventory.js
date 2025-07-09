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

module.exports = router;
