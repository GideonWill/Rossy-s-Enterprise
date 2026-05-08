import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../api";

export type User = {
  id: number;
  email: string;
  name: string;
  role: "admin" | "customer";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["auth-me", token],
    queryFn: async () => {
      if (!token) return null;
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    enabled: !!token,
    retry: false
  });

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }, [error]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading: !!token && isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
