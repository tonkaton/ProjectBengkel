const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const c = require('../controllers/maintenanceController');

// Get latest upcoming maintenance for customer dashboard
r.get('/latest', auth, c.getLatestUpcoming);

r.get('/', auth, (req, res) => {
  if (req.user.role === 'admin') return c.getAll(req, res);
  return c.getMyMaintenances(req, res);
});

r.post('/', auth, admin, c.create);
r.delete('/:id', auth, admin, c.remove);

module.exports = r;