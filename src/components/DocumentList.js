import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDocuments } from "../context/DocumentContext";
import { styled } from "@mui/system";

// Styled container for the list with scrolling
const ScrollableListContainer = styled("div")({
  maxHeight: "300px",
  overflowY: "auto",
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  padding: "16px",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#fbe3e8", // Background color of the track
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#2d545e", // Color of the draggable part
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#5cbdb9", // Color when hovering over the draggable part
  },
});

// Styled list item with hover effect
const HoverListItem = styled(ListItem)({
  transition: "background 0.3s",
  backgroundColor: "#5cbdb9",
  marginBottom: "8px",
  borderRadius: "4px",
  marginTop: "8px",
  "&:hover": {
    backgroundColor: "#ebf6f5",
    cursor: "pointer",
  },
});

function DocumentList() {
  const { state, fetchAllDocuments } = useDocuments();
  const { documents, loading, error } = state;

  useEffect(() => {
    fetchAllDocuments();
  }, [fetchAllDocuments]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error">Failed to load documents: {error}</Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        Document List
      </Typography>
      <ScrollableListContainer>
        <List>
          {documents.map((doc) => (
            <HoverListItem key={doc._id}>
              <ListItemText
                primary={doc.title}
                secondary={`${doc.type} - ${new Date(
                  doc.createdAt
                ).toLocaleDateString()}`}
              />
            </HoverListItem>
          ))}
        </List>
      </ScrollableListContainer>
    </div>
  );
}

export default DocumentList;
