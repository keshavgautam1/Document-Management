import express from "express";
import cors from "cors";
import db from "./db/index.js";
import Document from "./models/document.js";

const app = express();
app.use(cors());
app.use(express.json());

// Route for fetching all documents
app.get("/api/documents", async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Error fetching documents");
  }
});

// Route for creating a new document
app.post("/api/documents", async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(400).send("Error creating document");
  }
});

// Route for searching documents
app.get("/api/documents/search", async (req, res) => {
  const query = req.query.q;
  try {
    if (!query) return res.status(400).send("Query parameter is required");

    const lowerQuery = query.toLowerCase();

    const results = await Document.find({
      $or: [
        { title: { $regex: lowerQuery, $options: "i" } },
        { content: { $regex: lowerQuery, $options: "i" } },
        { type: { $regex: lowerQuery, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Error searching documents:", error);
    res.status(500).send("Error searching documents");
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
