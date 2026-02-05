const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define(
  "Booking",
  {
    // Nama Tamu (Inputan Landing Page)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // No WA (Inputan Landing Page)
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Jenis Motor (Teks mentah, misal: "Vario 150")
    motor_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Jenis Servis (Teks mentah, misal: "Servis Ringan")
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Tanggal Booking
    booking_date: {
      type: DataTypes.DATEONLY, // Format: YYYY-MM-DD
      allowNull: false,
    },
    // Keluhan / Catatan
    complaint: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Status Booking (Pending = Masuk, Processed = Jadi Transaksi, Cancelled = Ditolak)
    status: {
      type: DataTypes.ENUM("Pending", "Processed", "Cancelled"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "bookings",
    timestamps: true, // Biar ada createdAt (kapan dia booking)
  }
);

module.exports = Booking;