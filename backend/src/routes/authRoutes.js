const r = require('express').Router();
const c = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

r.post('/register', c.register);
r.post('/login', c.login);
r.get('/me', auth, c.getMe); 
r.get('/users', auth, admin, c.getAllUsers); 
r.post('/users', auth, admin, c.createUser); 

module.exports = r;