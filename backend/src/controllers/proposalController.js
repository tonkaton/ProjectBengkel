const Proposal = require('../models/Proposal');
const ProposalItem = require('../models/ProposalItem');
const Transaction = require('../models/Transaction');
const Service = require('../models/Service');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

// 1. CREATE (Admin bikin penawaran)
exports.create = async (req, res) => {
  const t = await sequelize.transaction(); // Wajib pake transaction biar data header & item masuk bareng
  try {
    const { UserId, VehicleId, title, admin_note, items } = req.body;

    // Validasi basic
    if (!UserId || !VehicleId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Data tidak lengkap (User, Kendaraan, dan Item wajib ada)' });
    }

    // 1. Hitung Grand Total dari item yang dikirim
    let grand_total = 0;
    const itemsPayload = items.map(item => {
      const subtotal = item.price * item.qty;
      grand_total += subtotal;
      return {
        description: item.description,
        type: item.type, // 'Part' atau 'Service'
        price: item.price,
        qty: item.qty,
        subtotal: subtotal
      };
    });

    // 2. Simpan Header Proposal
    const newProposal = await Proposal.create({
      UserId,
      VehicleId,
      title,
      admin_note,
      status: 'Sent', // Langsung kirim ke user
      grand_total
    }, { transaction: t });

    // 3. Simpan Detail Item (Bulk Insert biar cepet)
    const itemsWithId = itemsPayload.map(item => ({
      ...item,
      ProposalId: newProposal.id
    }));
    await ProposalItem.bulkCreate(itemsWithId, { transaction: t });

    await t.commit(); // Simpan permanen

    res.status(201).json({ 
      message: 'Proposal berhasil dibuat dan dikirim ke User', 
      data: newProposal 
    });

  } catch (e) {
    await t.rollback(); // Batalin semua kalo error
    console.error('Create proposal error:', e);
    res.status(500).json({ message: 'Gagal membuat proposal' });
  }
};

// 2. GET ALL (Buat Admin - Monitoring Project)
exports.getAll = async (req, res) => {
  try {
    const data = await Proposal.findAll({
      include: [
        { model: User, as: 'customer', attributes: ['name'] },
        { model: Vehicle, as: 'vehicle', attributes: ['brand', 'model', 'plate'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ data });
  } catch (e) {
    console.error('GetAll proposal error:', e);
    res.status(500).json({ message: 'Gagal mengambil data proposal' });
  }
};

// 3. GET BY USER (Buat Customer - Liat "Penawaran Saya")
exports.getByUser = async (req, res) => {
  try {
    const data = await Proposal.findAll({
      where: { UserId: req.user.id }, // Filter punya user yg login aja
      include: [
        { model: Vehicle, as: 'vehicle', attributes: ['brand', 'model', 'plate'] },
        // Kita include items biar user bisa langsung liat total & detail sekilas
        { model: ProposalItem, as: 'items' } 
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ data });
  } catch (e) {
    console.error('GetByUser proposal error:', e);
    res.status(500).json({ message: 'Gagal mengambil data proposal Anda' });
  }
};

// 4. GET DETAIL (Buat detail view / invoice)
exports.getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Proposal.findByPk(id, {
      include: [
        { model: User, as: 'customer', attributes: ['name', 'email', 'id'] },
        { model: Vehicle, as: 'vehicle' },
        { model: ProposalItem, as: 'items' }
      ]
    });

    if (!data) return res.status(404).json({ message: 'Proposal tidak ditemukan' });

    // Security: Kalo yg request bukan admin & bukan pemilik, tolak
    if (req.user.role !== 'admin' && data.UserId !== req.user.id) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    res.json({ data });
  } catch (e) {
    console.error('GetDetail error:', e);
    res.status(500).json({ message: 'Error mengambil detail' });
  }
};

// 5. ACCEPT PROPOSAL (CORE LOGIC - THE TRICK!)
exports.acceptProposal = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const proposal = await Proposal.findByPk(id);

    // Validasi
    if (!proposal) {
      await t.rollback();
      return res.status(404).json({ message: 'Proposal tidak ditemukan' });
    }
    // Pastikan cuma pemilik yg bisa accept
    if (proposal.UserId !== req.user.id) {
      await t.rollback();
      return res.status(403).json({ message: 'Ini bukan proposal Anda' });
    }
    // Cek status
    if (proposal.status !== 'Sent') {
      await t.rollback();
      return res.status(400).json({ message: 'Proposal sudah diproses atau kedaluwarsa' });
    }

    // --- LOGIC PANCINGAN DIMULAI ---
    
    // 1. Cari Service Pancingan (Misal namanya "Custom Project" atau ID 99)
    // Note: Pastikan Admin udah bikin service ini di menu Layanan
    let dummyService = await Service.findOne({ 
      where: { 
        [Op.or]: [{ name: 'Custom Project' }, { name: 'Modifikasi' }] 
      } 
    });

    // Fallback: Kalo admin lupa bikin service pancingan, pake service apa aja yg pertama (Bahaya dikit, tp biar ga error)
    if (!dummyService) {
      dummyService = await Service.findOne(); 
    }
    
    if (!dummyService) {
      await t.rollback();
      return res.status(500).json({ message: 'Sistem Error: Belum ada data Service di database' });
    }

    // 2. Create Transaksi
    // Kita "Override" harga service dummy (yg biasanya 0) jadi harga Grand Total Proposal
    await Transaction.create({
      UserId: req.user.id,
      ServiceId: dummyService.id, // Pake ID Service Pancingan
      ProposalId: proposal.id,    // LINK PENTING: Relasi ke proposal
      amount: proposal.grand_total, // <-- INI HARGA ASLINYA
      status: 'Menunggu', // Masuk antrian bengkel
      note: `Project Custom: ${proposal.title}`,
      points_earned: Math.floor(proposal.grand_total / 1000) // Bonus: 1 poin per 1000 rupiah (opsional logic)
    }, { transaction: t });

    // 3. Update Status Proposal
    proposal.status = 'Converted'; // Artinya udah jadi transaksi
    await proposal.save({ transaction: t });

    await t.commit();

    res.json({ message: 'Tawaran diterima! Transaksi telah dibuat, silakan cek menu Riwayat/Transaksi.' });

  } catch (e) {
    await t.rollback();
    console.error('Accept Proposal Error:', e);
    res.status(500).json({ message: 'Gagal memproses persetujuan' });
  }
};

// 6. REJECT PROPOSAL
exports.rejectProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await Proposal.findByPk(id);

    if (!proposal) return res.status(404).json({ message: 'Proposal tidak ditemukan' });
    if (proposal.UserId !== req.user.id) return res.status(403).json({ message: 'Akses ditolak' });

    if (proposal.status !== 'Sent') {
      return res.status(400).json({ message: 'Proposal tidak bisa ditolak lagi' });
    }

    proposal.status = 'Rejected';
    await proposal.save();

    res.json({ message: 'Penawaran ditolak' });
  } catch (e) {
    res.status(500).json({ message: 'Gagal menolak proposal' });
  }
};