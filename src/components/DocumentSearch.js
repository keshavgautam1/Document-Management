import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { searchDocuments } from "../api/documents";
import { styled } from "@mui/system";

const ResultsContainer = styled("div")({
  maxHeight: "300px",
  overflowY: "auto",
  marginTop: "10px",
  marginBottom: "10px",
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  padding: "16px",
  position: "relative",
  width: "100%",

  "&::-webkit-scrollbar": {
    width: "8px", // Width of the scrollbar
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

const ResultItem = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  marginBottom: "8px",
  borderRadius: "4px",
  background: "#5cbdb9",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background 0.3s",
  "&:hover": {
    background: "#ebf6f5",
  },
});

const ErrorText = styled(Typography)({
  color: "red",
});

function DocumentSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === "") {
      setResults([]);
    }
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setError("Try entering what you want to search.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const searchResults = await searchDocuments(query);
      if (Array.isArray(searchResults)) {
        setResults(searchResults);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search Documents"
          variant="outlined"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Search
        </Button>
      </form>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && query.trim() === "" && (
        <ErrorText sx={{ mt: 2 }}>{error}</ErrorText>
      )}
      {results.length > 0 && !error && (
        <ResultsContainer>
          {results.length > 0 ? (
            results.map((doc) => (
              <ResultItem key={doc._id}>
                <div>{doc.title}</div>
                <div>{new Date(doc.createdAt).toLocaleDateString()}</div>
              </ResultItem>
            ))
          ) : (
            <Typography sx={{ mt: 2 }}>No results found</Typography>
          )}
        </ResultsContainer>
      )}
    </div>
  );
}

export default DocumentSearch;
