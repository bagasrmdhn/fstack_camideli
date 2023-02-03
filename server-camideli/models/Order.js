const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  invoice: {
    type: String,
    required: true,
  },
  // This is the new field
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  // This is the new field
  proofPayment: {
    type: String,
    required: true,
  },
  bankFrom: {
    type: String,
    required: true,
  },
  item: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  // This is the new field
  transactionStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
