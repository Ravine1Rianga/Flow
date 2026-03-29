const app = require('./src/app.js');
require('dotenv').config();
// This index file should contain both the 'sequelize' instance and your Models.
const { sequelize } = require('./src/models'); 

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 2. Sync models (creates tables)
    // Using { alter: true } is great for development/
    await sequelize.sync({ alter: true }); 
    console.log('✅ Database models synced.');

    // 3. Test Connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // 4. Start Express
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); 
  }
}

startServer();