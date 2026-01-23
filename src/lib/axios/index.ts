import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Backend_URL,
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
  (error) => Promise.reject(error),
);

//Axios Interceptor response
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  },
);
