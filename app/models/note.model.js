const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    tag: String,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NoteSchema);
