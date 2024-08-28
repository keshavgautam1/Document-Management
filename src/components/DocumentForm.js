import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDocuments } from "../context/DocumentContext";

function DocumentForm() {
  const { addNewDocument } = useDocuments();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const document = { title, content, type };
    await addNewDocument(document);
    setTitle("");
    setContent("");
    setType("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ mt: 4 }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Add New Document
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <TextField
        label="Document Type"
        variant="outlined"
        fullWidth
        margin="normal"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Document
      </Button>
    </Box>
  );
}

export default DocumentForm;
