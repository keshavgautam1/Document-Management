import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
