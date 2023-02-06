const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  invoice: {
    type: String,
    required: true,
  },
  // This is the new field
  itemId: [
    {
      _id: {
        type: ObjectId,
        ref: "Item",
        required: true,
      },
      name: {
        type: String,
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
  total: {
    type: Number,
    required: true,
  },
  memberId: {
    type: ObjectId,
    ref: "Member",
  },
  bankId: {
    type: ObjectId,
    ref: "Bank",
  },
  payment: {
    // This is the new field
    proofPayment: {
      type: String,
      required: true,
    },
    bankFrom: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    accountHolder: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
