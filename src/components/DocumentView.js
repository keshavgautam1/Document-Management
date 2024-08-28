import React, { useEffect, useState } from "react";
import { Typography, Paper, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { getDocument } from "../api/documents";

function DocumentView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      // console.log(`Fetching document with ID: ${id}`);
      try {
        setLoading(true);
        const doc = await getDocument(id);
        setDocument(doc);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch document:", error);
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!document) {
    return <Typography color="error">Document not found</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {document.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {document.content}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Type: {document.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created: {new Date(document.createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}

export default DocumentView;
