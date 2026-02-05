// utils/queueGenerator.js
const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');

/**
 * Generate nomor antrian berdasarkan tanggal target (bukan hari ini/createdAt)
 * @param {Date|string} [targetDate] - Tanggal yang diinginkan (default: hari ini)
 * @returns {Promise<string>} Format: "YYYYMMDD-001"
 */
const generateQueueNumber = async (targetDate = new Date()) => {
  // Normalisasi input jadi Date object
  let dateObj = targetDate instanceof Date ? targetDate : new Date(targetDate);

  // Validasi tanggal
  if (isNaN(dateObj.getTime())) {
    throw new Error('Tanggal yang diberikan tidak valid');
  }

  // Ambil YYYYMMDD
  const year  = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day   = String(dateObj.getDate()).padStart(2, '0');
  const dateCode = `${year}${month}${day}`;

  // Hitung berapa entri yang sudah pakai prefix ini
  const count = await Transaction.count({
    where: {
      queue_number: {
        [Op.like]: `${dateCode}-%`,
      },
    },
    // transaction: t,  // kalau nanti wrap di Sequelize transaction, tambahin ini
  });

  const sequence = String(count + 1).padStart(3, '0');
  const newQueue = `${dateCode}-${sequence}`;

  // Cek race condition sederhana (cek apakah nomor ini sudah dipakai)
  // Ini cukup untuk kebanyakan kasus kecil-menengah
  const conflict = await Transaction.findOne({
    where: { queue_number: newQueue },
    attributes: ['id'],
    raw: true,
  });

  if (conflict) {
    // Kalau bentrok → rekursif coba lagi (jarang banget terjadi kalau tidak super concurrent)
    // Bisa diganti loop while kalau mau lebih clean
    console.warn(`Konflik queue number ${newQueue}, mencoba ulang...`);
    return generateQueueNumber(targetDate); // rekursif 1 level biasanya cukup
  }

  return newQueue;
};

module.exports = generateQueueNumber;