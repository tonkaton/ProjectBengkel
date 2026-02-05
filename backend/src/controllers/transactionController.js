const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Service = require('../models/Service');
const LoyaltyPoint = require('../models/LoyaltyPoint');
const Proposal = require('../models/Proposal');
const generateQueueNumber = require('../utils/queueGenerator');

exports.getAll = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      include: [
        { 
          model: User, 
          as: 'customer', 
          attributes: ['name', 'email'], 
          required: false 
        },
        { 
          model: Service, 
          as: 'service', 
          attributes: ['name', 'price', 'points'], 
          required: false 
        },
        {
          model: Proposal,
          as: 'proposal',
          attributes: ['title', 'status', 'grand_total'],
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ data });
  } catch (e) {
    console.error('Transaction getAll error:', e);
    res.status(500).json({ message: 'Gagal mengambil data transaksi' });
  }
};

exports.getMyTransactions = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      where: { UserId: req.user.id },
      include: [
        { 
          model: Service, 
          as: 'service', 
          attributes: ['name'], 
          required: false 
        },
        {
          model: Proposal,
          as: 'proposal',
          attributes: ['title', 'status', 'grand_total'],
          required: false
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ data });
  } catch (e) {
    console.error('getMyTransactions error:', e);
    res.status(500).json({ message: 'Gagal mengambil riwayat transaksi Anda' });
  }
};

exports.create = async (req, res) => {
  try {
    const { UserId, ServiceId, amount, points_earned, status, note } = req.body;

    if (!UserId || !ServiceId) {
      return res.status(400).json({ message: 'UserId dan ServiceId wajib diisi' });
    }

    // Fetch service to get default amount and points
    const service = await Service.findByPk(ServiceId);
    if (!service) {
      return res.status(404).json({ message: 'Layanan tidak ditemukan' });
    }

    // 👇 2. Generate Nomor Antrian Baru
    const newQueueNumber = await generateQueueNumber();

    const t = await Transaction.create({ 
      UserId, 
      ServiceId, 
      amount: amount || service.price, 
      points_earned: points_earned || service.points, 
      status: status || 'Menunggu', 
      note,
      queue_number: newQueueNumber // 👇 3. Simpan ke Database
    });

    res.status(201).json({ data: t });
  } catch (e) {
    console.error('Create transaction error:', e);
    res.status(400).json({ message: 'Gagal membuat transaksi' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Hanya admin yang dapat mengubah status transaksi' });
    }

    const { status } = req.body;
    if (!['Menunggu', 'Proses', 'Selesai'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid (Menunggu/Proses/Selesai)' });
    }

    const t = await Transaction.findByPk(req.params.id, {
      include: [
        { 
          model: Service, 
          as: 'service', 
          attributes: ['name'], 
          required: false 
        }
      ]
    });

    if (!t) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    if (status === 'Selesai' && t.status !== 'Selesai') {
      const lp = await LoyaltyPoint.findOne({ where: { UserId: t.UserId } });
      if (lp) {
        await lp.increment('points', { by: t.points_earned });
      }
    }

    t.status = status;
    await t.save();

    res.json({ 
      message: 'Status transaksi berhasil diperbarui', 
      data: t 
    });
  } catch (e) {
    console.error('Update status error:', e);
    res.status(400).json({ message: 'Gagal memperbarui status' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Hanya admin yang dapat menghapus transaksi' });
    }

    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    await transaction.destroy();

    res.json({ message: 'Transaksi berhasil dihapus' });
  } catch (e) {
    console.error('Delete transaction error:', e);
    res.status(500).json({ message: 'Gagal menghapus transaksi' });
  }
};