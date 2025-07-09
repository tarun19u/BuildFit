const { initializeInventoryDB, initializeDefaultStock } = require('./inventory');

// Initialize inventory database with default stock
async function initInventory() {
  try {
    console.log('🔄 Initializing inventory database...');
    
    await initializeInventoryDB();
    console.log('✅ Inventory database tables created');
    
    await initializeDefaultStock();
    console.log('✅ Default stock levels initialized');
    
    console.log('🎉 Inventory system ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to initialize inventory:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initInventory();
}

module.exports = { initInventory };
