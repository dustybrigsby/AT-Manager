const { Schema, model } = require("mongoose");

const toolSchema = new Schema({
  assetTag: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  serial: {
    type: String,
  },
  model: {
    type: String,
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
    default: 1,
  },
  available: {
    type: Number,
    min: 0,
    required: true,
    default: 1,
  },
  status: {
    type: String,
    required: true,
    default: "Available",
  },
});

const Tool = model("Tool", toolSchema);

module.exports = Tool;
