const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const c = require('../controllers/rewardController');

r.get('/', auth, c.getAll);
r.post('/', auth, admin, c.create);
r.put('/:id', auth, admin, c.update);
r.delete('/:id', auth, admin, c.remove);
r.post('/exchange/:id', auth, c.exchange);

module.exports = r;