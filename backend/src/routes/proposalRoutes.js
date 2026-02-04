const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const c = require('../controllers/proposalController');

r.get('/', auth, (req, res) => {
  if (req.user.role === 'admin') {
    return c.getAll(req, res);
  }
  return c.getByUser(req, res);
});

r.get('/:id', auth, c.getDetail);
r.post('/', auth, admin, c.create);
r.post('/:id/accept', auth, c.acceptProposal);
r.post('/:id/reject', auth, c.rejectProposal);

module.exports = r;