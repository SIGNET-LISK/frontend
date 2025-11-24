import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Helper function untuk handle error
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Network error (backend tidak running)
    if (axiosError.code === "ECONNREFUSED" || axiosError.code === "ERR_NETWORK") {
      return "Backend server is not running. Please start the backend server at http://localhost:3000";
    }
    
    // Timeout
    if (axiosError.code === "ECONNABORTED") {
      return "Request timeout. Please check your connection and try again.";
    }
    
    // Server error dengan response
    if (axiosError.response) {
      return axiosError.response.data?.detail || axiosError.response.data?.message || `Server error: ${axiosError.response.status}`;
    }
    
    // Request error tanpa response
    if (axiosError.request) {
      return "No response from server. Please check if the backend is running.";
    }
  }
  
  // Generic error
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred. Please try again.";
};

// Upload file dan dapat pHash
export const uploadFile = async (file: File, title: string, desc: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("desc", desc);

    const response = await api.post("/api/v1/hash-file-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Verifikasi konten (upload file dan cek dengan blockchain)
export const verifyContent = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/v1/verify-content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

export default api;

