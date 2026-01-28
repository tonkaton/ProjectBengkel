const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoyaltyPoint = require('../models/LoyaltyPoint');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password required' });
    
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    await LoyaltyPoint.create({ UserId: user.id, points: 0 });
    res.json({ message: 'Register ok' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User tidak ada' });
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Password salah' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role'],
      include: [{
        model: LoyaltyPoint,
        as: 'loyaltyPoints',
        attributes: ['points']
      }]
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // Gabungkan data user + points
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.loyaltyPoints?.points || 0
    };

    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Gagal mengambil data user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hash, 
      role: 'user' // Force role to be 'user' only
    });
    
    // Create loyalty points for new user
    await LoyaltyPoint.create({ UserId: user.id, points: 0 });
    
    res.status(201).json({ 
      message: 'User berhasil dibuat',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }
    console.error('Create user error:', e);
    res.status(400).json({ message: 'Gagal membuat user' });
  }
};