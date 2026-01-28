const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const c = require('../controllers/vehicleController');

r.get('/', auth, c.getAll);
r.get('/my', auth, c.getMyVehicles);

r.post('/', auth, c.create);
r.put('/:id', auth, c.update);
r.delete('/:id', auth, c.remove);

module.exports = r;