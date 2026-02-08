import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call error: ", error);
    return Promise.reject(error);
  }
);

export default apiClient;
