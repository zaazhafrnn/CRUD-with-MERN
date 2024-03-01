const mongoose = require("mongoose");

const Buku = mongoose.model("Buku", {
    judul: String,
    tahun: Number,
}, 'buku');

module.exports = { Buku };