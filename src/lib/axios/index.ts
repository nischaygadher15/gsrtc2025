import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

export default api;

let isRefreshing = false;
let failedQueue: {
  resolve: () => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve();
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    console.log("error.response.status: ", error.response.status);

    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve: () => api(originalRequest), reject });
      });
    }

    isRefreshing = true;

    try {
      const refresh = await api.get("/auth/refresh");

      console.log("refresh: ", refresh);

      processQueue(null);

      return api(originalRequest);
    } catch (error) {
      console.log("refresh-APi-Error: ", error);

      processQueue(error);

      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
