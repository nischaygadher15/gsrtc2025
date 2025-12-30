import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Backend_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

// Axios Request Interceptor
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

//Axios Interceptor response
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request");
    }

    Promise.reject(error);
  }
);
