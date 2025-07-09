const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create inventory database
const dbPath = path.join(__dirname, 'inventory.db');
const inventoryDb = new sqlite3.Database(dbPath);

// Initialize inventory table
const initializeInventoryDB = () => {
  return new Promise((resolve, reject) => {
    inventoryDb.serialize(() => {
      // Create inventory table
      inventoryDb.run(`
        CREATE TABLE IF NOT EXISTS inventory (
          product_id INTEGER PRIMARY KEY,
          product_name TEXT NOT NULL,
          stock_quantity INTEGER DEFAULT 0,
          reserved_quantity INTEGER DEFAULT 0,
          min_stock_level INTEGER DEFAULT 5,
          last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating inventory table:', err);
          reject(err);
        } else {
          console.log('Inventory table created successfully');
        }
      });

      // Create stock history table for tracking changes
      inventoryDb.run(`
        CREATE TABLE IF NOT EXISTS stock_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          change_type TEXT NOT NULL, -- 'purchase', 'restock', 'reserve', 'release'
          quantity_change INTEGER NOT NULL,
          previous_quantity INTEGER,
          new_quantity INTEGER,
          reason TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (product_id) REFERENCES inventory (product_id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating stock_history table:', err);
          reject(err);
        } else {
          console.log('Stock history table created successfully');
          resolve();
        }
      });
    });
  });
};

// Initialize with default stock levels
const initializeDefaultStock = () => {
  return new Promise((resolve, reject) => {
    const defaultStock = [
      { id: 1, name: "Adjustable Dumbbell Set", stock: 15 },
      { id: 2, name: "Whey Protein Powder", stock: 25 },
      { id: 3, name: "Smart Treadmill", stock: 3 },
      { id: 4, name: "Fitness Training Guide", stock: 50 },
      { id: 5, name: "Yoga Mat Premium", stock: 20 },
      { id: 6, name: "Pre-Workout Energy", stock: 10 },
      { id: 7, name: "Hyperextension Machine", stock: 2 },
      { id: 8, name: "Olympic Barbell Rod", stock: 8 },
      { id: 9, name: "Incline Bench Press", stock: 4 },
      { id: 10, name: "Decline Bench Press", stock: 3 },
      { id: 11, name: "Flat Bench Press", stock: 5 },
      { id: 12, name: "Shoulder Press Machine", stock: 2 },
      { id: 13, name: "Leg Extension Machine", stock: 3 },
      { id: 14, name: "Leg Curl Machine", stock: 3 },
      { id: 15, name: "Leg Press Machine", stock: 1 },
      { id: 16, name: "Lat Pulldown Machine", stock: 2 },
      { id: 17, name: "T-Bar Chest Machine", stock: 2 },
      { id: 18, name: "Seated Row Machine", stock: 3 },
      { id: 19, name: "Thigh Abductor Machine", stock: 2 },
      { id: 20, name: "Bicep Curl Machine", stock: 4 },
      { id: 21, name: "Tricep Extension Machine", stock: 4 },
      { id: 22, name: "Pull-Up/Chin-Up Station", stock: 6 },
      { id: 23, name: "Exercise Bike", stock: 5 },
      { id: 24, name: "Stair Climber", stock: 2 },
      { id: 25, name: "Heavy Boxing Bag", stock: 8 },
      { id: 26, name: "Boxing Gloves", stock: 15 },
      { id: 27, name: "Protein Shaker Bottle", stock: 30 },
      { id: 28, name: "Gym T-Shirt", stock: 25 },
      { id: 29, name: "Athletic Shorts", stock: 20 },
      { id: 30, name: "Training Shoes", stock: 12 },
      { id: 31, name: "Workout Gloves", stock: 18 },
      { id: 32, name: "Gym Towel", stock: 35 },
      { id: 33, name: "Water Bottle", stock: 22 },
      { id: 34, name: "Exercise Ball", stock: 10 },
      { id: 35, name: "Hyper Extension Machine", stock: 1 },
      { id: 36, name: "Hyper Extension Machine", stock: 2 }
    ];

    // Check if data already exists
    inventoryDb.get("SELECT COUNT(*) as count FROM inventory", (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count > 0) {
        console.log('Inventory already initialized');
        resolve();
        return;
      }

      // Insert default stock levels
      const stmt = inventoryDb.prepare(`
        INSERT OR REPLACE INTO inventory 
        (product_id, product_name, stock_quantity, reserved_quantity, min_stock_level) 
        VALUES (?, ?, ?, 0, 5)
      `);

      defaultStock.forEach(item => {
        stmt.run(item.id, item.name, item.stock);
      });

      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Default inventory initialized successfully');
          resolve();
        }
      });
    });
  });
};

// Inventory management functions
const InventoryManager = {
  // Get stock for a specific product
  getStock: (productId) => {
    return new Promise((resolve, reject) => {
      inventoryDb.get(
        "SELECT * FROM inventory WHERE product_id = ?",
        [productId],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            const availableStock = row.stock_quantity - row.reserved_quantity;
            resolve({
              productId: row.product_id,
              available: availableStock > 0,
              quantity: availableStock,
              totalStock: row.stock_quantity,
              reserved: row.reserved_quantity,
              isLowStock: availableStock <= row.min_stock_level && availableStock > 0
            });
          } else {
            resolve({
              productId: productId,
              available: false,
              quantity: 0,
              totalStock: 0,
              reserved: 0,
              isLowStock: false
            });
          }
        }
      );
    });
  },

  // Get all inventory
  getAllStock: () => {
    return new Promise((resolve, reject) => {
      inventoryDb.all(
        "SELECT * FROM inventory ORDER BY product_id",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const inventory = {};
            rows.forEach(row => {
              const availableStock = row.stock_quantity - row.reserved_quantity;
              inventory[row.product_id] = {
                productId: row.product_id,
                available: availableStock > 0,
                quantity: availableStock,
                totalStock: row.stock_quantity,
                reserved: row.reserved_quantity,
                isLowStock: availableStock <= row.min_stock_level && availableStock > 0
              };
            });
            resolve(inventory);
          }
        }
      );
    });
  },

  // Reserve stock (when adding to cart)
  reserveStock: (productId, quantity) => {
    return new Promise((resolve, reject) => {
      inventoryDb.serialize(() => {
        inventoryDb.get(
          "SELECT * FROM inventory WHERE product_id = ?",
          [productId],
          (err, row) => {
            if (err) {
              reject(err);
              return;
            }

            if (!row) {
              reject(new Error('Product not found'));
              return;
            }

            const availableStock = row.stock_quantity - row.reserved_quantity;
            if (availableStock < quantity) {
              reject(new Error('Insufficient stock'));
              return;
            }

            // Update reserved quantity
            inventoryDb.run(
              "UPDATE inventory SET reserved_quantity = reserved_quantity + ?, last_updated = CURRENT_TIMESTAMP WHERE product_id = ?",
              [quantity, productId],
              function(err) {
                if (err) {
                  reject(err);
                } else {
                  // Log the reservation
                  inventoryDb.run(
                    "INSERT INTO stock_history (product_id, change_type, quantity_change, previous_quantity, new_quantity, reason) VALUES (?, 'reserve', ?, ?, ?, 'Item reserved in cart')",
                    [productId, -quantity, availableStock, availableStock - quantity]
                  );
                  resolve({ success: true, reservedQuantity: quantity });
                }
              }
            );
          }
        );
      });
    });
  }
};

module.exports = {
  inventoryDb,
  initializeInventoryDB,
  initializeDefaultStock,
  InventoryManager
};
