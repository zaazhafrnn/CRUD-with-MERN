const mongoose = require("mongoose");

const Peminjaman = mongoose.model("Peminjaman", {
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  bukuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buku' },
  tanggalPeminjaman: Date,
}, 'peminjaman');

module.exports = { Peminjaman };
