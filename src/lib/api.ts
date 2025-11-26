import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
    if (
      axiosError.code === "ECONNREFUSED" ||
      axiosError.code === "ERR_NETWORK"
    ) {
      return "Backend server is not running. Please start the backend server at http://localhost:8000";
    }

    // Timeout
    if (axiosError.code === "ECONNABORTED") {
      return "Request timeout. Please check your connection and try again.";
    }

    // Server error dengan response
    if (axiosError.response) {
      const responseData = axiosError.response.data as any;
      return (
        responseData?.detail ||
        responseData?.message ||
        `Server error: ${axiosError.response.status}`
      );
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

// Register content langsung ke blockchain (backend-1 menggunakan relayer, gasless untuk user)
export const registerContent = async (
  file: File,
  title: string,
  description: string,
  publisherAddress?: string // Address dari wallet yang connect
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    // Send publisher address untuk validasi di backend
    if (publisherAddress) {
      formData.append("publisher_address", publisherAddress);
    }

    const response = await api.post("/api/register-content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 120000, // 2 minutes timeout untuk blockchain transaction
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Verifikasi konten (upload file ATAU link dan cek dengan blockchain)
// Backend-1 menggunakan parameter "link" untuk URL
export const verifyContent = async (file?: File, link?: string) => {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    } else if (link) {
      formData.append("link", link);
    } else {
      throw new Error("Either file or link must be provided");
    }

    const response = await api.post("/api/verify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 120000, // 2 minutes timeout untuk URL download (lebih lama dari file upload)
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

// Get all contents (untuk gallery/feed)
export const getAllContents = async () => {
  try {
    const response = await api.get("/api/contents");
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

export default api;
