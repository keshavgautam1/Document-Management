import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { fetchDocuments, createDocument } from "../api/documents";

const DocumentContext = createContext();

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

function documentReducer(state, action) {
  switch (action.type) {
    case "FETCH_DOCUMENTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_DOCUMENTS_SUCCESS":
      return { ...state, loading: false, documents: action.payload };
    case "FETCH_DOCUMENTS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "ADD_DOCUMENT_SUCCESS":
      return { ...state, documents: [...state.documents, action.payload] };
    case "ADD_DOCUMENT_FAILURE":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export function DocumentProvider({ children }) {
  const [state, dispatch] = useReducer(documentReducer, initialState);

  const fetchAllDocuments = useCallback(async () => {
    dispatch({ type: "FETCH_DOCUMENTS_REQUEST" });
    try {
      const data = await fetchDocuments();
      dispatch({ type: "FETCH_DOCUMENTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_DOCUMENTS_FAILURE", error: error.message });
    }
  }, []); // Memoize fetchAllDocuments

  const addNewDocument = async (document) => {
    try {
      const newDoc = await createDocument(document);
      dispatch({ type: "ADD_DOCUMENT_SUCCESS", payload: newDoc });
    } catch (error) {
      dispatch({ type: "ADD_DOCUMENT_FAILURE", error: error.message });
    }
  };

  useEffect(() => {
    fetchAllDocuments();
  }, [fetchAllDocuments]); // Ensure stable fetchAllDocuments

  return (
    <DocumentContext.Provider
      value={{ state, fetchAllDocuments, addNewDocument }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export const useDocuments = () => {
  return useContext(DocumentContext);
};
