import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

notesSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Note", notesSchema);
