const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Relación con el usuario
  createdOn: { type: Date, default: Date.now }, // Fecha de creación con Date.now
}, { timestamps: true }); // Timestamps para manejar createdAt y updatedAt automáticos

module.exports = mongoose.model("Note", noteSchema);
