const mongoose = require("mongoose");

const Student = mongoose.model("Student", {
  nama: String,
  hobi: String,
  umur: Number,
  kelas: Number
});

module.exports = { Student };