const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const c = require('../controllers/transactionController');

r.get('/', auth, (req, res) => {
  if (req.user.role === 'admin') return c.getAll(req, res);
  return c.getMyTransactions(req, res);
});

r.post('/', auth, admin, c.create);
r.put('/:id/status', auth, admin, c.updateStatus);
r.delete('/:id', auth, admin, c.deleteTransaction);

module.exports = r;