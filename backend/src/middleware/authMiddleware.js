const jwt = require('jsonwebtoken');
const blocklist = require('../utils/tokenBlocklist');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Akses ditolak, token hilang' });

  // Reject tokens that were explicitly logged out (cross-origin logout sync).
  if (blocklist.has(token)) {
    return res.status(401).json({ message: 'Sesi telah berakhir, silakan login kembali' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token tidak valid atau expired' });
  }
};