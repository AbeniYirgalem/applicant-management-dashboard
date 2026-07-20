"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthContext } from "@/contexts/auth-context";
import {
  clearStoredToken,
  getStoredToken,
  storeToken,
} from "@/lib/auth-storage";
import { login as loginRequest } from "@/services/auth";
import type {
  AuthContextValue,
  AuthUser,
  LoginCredentials,
} from "@/types/auth";

function decodeUser(token: string): AuthUser | null {
  try {
    const encodedPayload = token.split(".")[1];
    const payload = JSON.parse(
      atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { sub: string; email: string; role: string; exp: number };
    if (payload.exp * 1000 <= Date.now()) return null;
    return {
      id: payload.sub,
      fullName: "Challenge Administrator",
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedToken = getStoredToken();
      const storedUser = storedToken ? decodeUser(storedToken) : null;
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      } else if (storedToken) clearStoredToken();
      setIsLoading(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const logout = useCallback(
    (reason: "manual" | "expired" = "manual") => {
      clearStoredToken();
      setToken(null);
      setUser(null);
      router.replace("/login");
      if (reason === "expired") {
        toast.error("Your session has expired.", {
          description: "Please sign in again.",
        });
      } else {
        toast.success("Logged out successfully.");
      }
    },
    [router],
  );

  useEffect(() => {
    const handleExpiry = () => logout("expired");
    window.addEventListener("auth:expired", handleExpiry);
    return () => window.removeEventListener("auth:expired", handleExpiry);
  }, [logout]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const session = await loginRequest(credentials);
        storeToken(session.accessToken, session.expiresIn);
        setToken(session.accessToken);
        setUser(session.user);
        router.replace("/dashboard");
        toast.success(`Welcome back, ${session.user.fullName}.`);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
