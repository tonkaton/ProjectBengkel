const r = require('express').Router();
const c = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

r.post('/register', c.register);
r.post('/login', c.login);
r.get('/me', auth, c.getMe); 
r.get('/users', auth, admin, c.getAllUsers); 
r.post('/users', auth, admin, c.createUser); 
r.delete('/users/:id', auth, admin, c.deleteUser);
r.put('/users/:id', auth, admin, c.updateUser);

module.exports = r;