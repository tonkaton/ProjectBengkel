module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Izinkan akses
  } else {
    res.status(403).json({ 
      message: 'Akses ditolak: Anda bukan Administrator!' 
    });
  }
};