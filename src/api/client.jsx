// src/api/client.jsx
import axios from "axios";

let suppressGlobalError = false;

export function suppressNextGlobalError() {
  suppressGlobalError = true;
  setTimeout(() => {
    suppressGlobalError = false;
  }, 2000); // 2 seconds is enough
}

const API = axios.create({
  baseURL: "http://localhost:4000",
});

// Attach token
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (suppressGlobalError) {
      return Promise.reject(error);
    }

    window.dispatchEvent(
      new CustomEvent("app-error", {
        detail: {
          title: "System Error",
          message:
            error.response?.data?.message ||
            "Unable to communicate with the server.",
          actionLabel: "Return to Dashboard",
          nextScreen: "dashboard",
          source: error.config?.url || "unknown",
        },
      })
    );

    return Promise.reject(error);
  }
);

export default API;
