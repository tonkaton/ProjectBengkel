require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');
require('./src/jobs/maintenanceReminder');
const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();    
    await sequelize.sync({ alter: true });
    console.log('Database connected & synced');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Maintenance reminder job is active');
    });
  } catch (e) {
    console.error('Gagal menjalankan server:', e.message);
    process.exit(1);
  }
})();
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
});