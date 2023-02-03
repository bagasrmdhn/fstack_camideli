const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bank", bankSchema);
