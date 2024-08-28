import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const fetchDocuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/documents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const createDocument = async (document) => {
  try {
    const response = await axios.post(`${API_URL}/documents`, document);
    return response.data;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

export const searchDocuments = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/documents/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching documents:", error);
    throw error;
  }
};

export const getDocument = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
