const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoyaltyPoint = require('../models/LoyaltyPoint');
const Vehicle = require('../models/Vehicle');
const Transaction = require('../models/Transaction');

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
      include: [{
        model: LoyaltyPoint,
        as: 'loyaltyPoints',
        attributes: ['points'],
        required: false   // supaya user tanpa loyalty point tetap muncul
      }],
      order: [['createdAt', 'DESC']]
    });

    // Format response supaya konsisten dan frontend langsung bisa pakai c.points
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      points: user.loyaltyPoints ? user.loyaltyPoints.points : 0
    }));

    res.json(formattedUsers);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Gagal mengambil data user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hash, 
      role: role || 'user' 
    });
    
    await LoyaltyPoint.create({ UserId: user.id, points: 0 });
    
    res.status(201).json({ 
      message: 'User berhasil dibuat',
      data: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }
    res.status(400).json({ message: 'Gagal membuat user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    if (password && password.trim() !== "") {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }

    await user.save();
    res.json({ message: 'User berhasil diupdate', data: user });
  } catch (e) {
    res.status(500).json({ message: 'Gagal update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    if (user.role === 'admin') return res.status(403).json({ message: 'Tidak dapat menghapus admin' });

    await Vehicle.destroy({ where: { UserId: id } });
    await LoyaltyPoint.destroy({ where: { UserId: id } });

    const userTransactions = await Transaction.findAll({ where: { UserId: id } });
    if (userTransactions.length > 0) {
      await Promise.all(userTransactions.map(async (t) => {
        const oldNote = t.note || '';
        if (!oldNote.includes('(Ex:')) {
          await t.update({
            UserId: null,
            note: `${oldNote} (Ex: ${user.name})`.trim()
          });
        }
      }));
    }

    await user.destroy();
    res.json({ message: 'User berhasil dihapus' });
  } catch (e) {
    res.status(500).json({ message: 'Gagal menghapus user' });
  }
};