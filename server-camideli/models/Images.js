const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const imagesSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  ItemId: {
    type: ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Images", imagesSchema);
