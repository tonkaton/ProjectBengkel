const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const c = require('../controllers/pushController');
r.get('/status', auth, (req, res) => {
  res.json({ enabled: true, message: 'Push notification feature is active' });
});
r.post('/subscribe', auth, c.subscribe);
module.exports = r;