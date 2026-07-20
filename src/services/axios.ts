import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { API_ENDPOINTS } from "@/constants/api";
import { getStoredToken } from "@/lib/auth-storage";
import type { APIError } from "@/types/api";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(normalizeError(error)),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isLoginRequest = error.config?.url === API_ENDPOINTS.auth.login;
    if (
      error.response?.status === 401 &&
      !isLoginRequest &&
      typeof window !== "undefined" &&
      getStoredToken()
    ) {
      window.dispatchEvent(new Event("auth:expired"));
    }
    return Promise.reject(normalizeError(error));
  },
);

type ErrorPayload = { message?: string; error?: string };

function createError(
  title: string,
  message: string,
  statusCode?: number,
  details?: Record<string, unknown>,
): APIError {
  return { title, message, statusCode, details };
}

/** Converts Axios and unknown failures into user-friendly authentication errors. */
export function getAuthErrorMessage(error: unknown): APIError {
  if (!axios.isAxiosError(error)) {
    if (isAPIError(error)) return error;
    return createError(
      "An unexpected error occurred.",
      "Please try again later.",
    );
  }

  const statusCode = error.response?.status;
  const details = error.response?.data as Record<string, unknown> | undefined;
  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return createError(
      "The request timed out.",
      "Please check your connection and try again.",
      statusCode,
      details,
    );
  }
  if (error.code === "ERR_NETWORK" || !error.response) {
    return createError(
      "No Internet Connection",
      "Please check your internet connection and try again.",
      statusCode,
      details,
    );
  }
  if (statusCode === 401) {
    return error.config?.url === API_ENDPOINTS.auth.login
      ? createError("Invalid email or password.", "", statusCode, details)
      : createError(
          "Your session has expired.",
          "Please sign in again.",
          statusCode,
          details,
        );
  }
  if (statusCode === 400) {
    const payload = error.response?.data as ErrorPayload | undefined;
    return createError(
      payload?.message ??
        payload?.error ??
        "Please check the information you entered.",
      "",
      statusCode,
      details,
    );
  }
  if (statusCode && statusCode >= 500) {
    return createError(
      "Our server is currently unavailable.",
      "Please try again in a few minutes.",
      statusCode,
      details,
    );
  }
  return createError(
    "An unexpected error occurred.",
    "Please try again later.",
    statusCode,
    details,
  );
}

function isAPIError(error: unknown): error is APIError {
  return Boolean(
    error &&
    typeof error === "object" &&
    "message" in error &&
    "title" in error,
  );
}

export const normalizeError = getAuthErrorMessage;
