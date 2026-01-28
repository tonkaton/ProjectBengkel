const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware'); 
const c = require('../controllers/serviceController');

r.get('/', c.getAll);
r.post('/', auth, admin, c.create);
r.put('/:id', auth, admin, c.update);
r.delete('/:id', auth, admin, c.remove);

module.exports = r;