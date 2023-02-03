const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },

  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
  // images: [
  //   {
  //     type: ObjectId,
  //     ref: "Images",
  //     required: true,
  //   },
  // ],
});

module.exports = mongoose.model("Item", itemSchema);
