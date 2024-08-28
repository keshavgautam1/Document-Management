import React from "react";

import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  GlobalStyles,
} from "@mui/material";
import { DocumentProvider } from "./context/DocumentContext";
import DocumentList from "./components/DocumentList";
import DocumentForm from "./components/DocumentForm";
import DocumentSearch from "./components/DocumentSearch";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-track": {
            background: "#fbe3e8", // Background color of the track
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#2d545e", // Color of the draggable part
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#5cbdb9", // Color when hovering over the draggable part
          },
        }}
      />
      <DocumentProvider>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography
              variant="h1"
              component="h1"
              align="center"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                fontSize: "3rem",
                color: "primary.main",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 4,
              }}
            >
              Legal Document Management
            </Typography>
            <DocumentSearch />
            <DocumentList />
            <DocumentForm />
          </Box>
        </Container>
      </DocumentProvider>
    </ThemeProvider>
  );
}

export default App;
