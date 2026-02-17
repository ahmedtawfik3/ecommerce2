"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "shopmart_users";
const STORAGE_CURRENT = "shopmart_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_CURRENT);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as any[];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const { name, email } = found;
      const currentUser = { name, email };
      setUser(currentUser);
      localStorage.setItem(STORAGE_CURRENT, JSON.stringify(currentUser));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as any[];
    if (users.some((u) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_CURRENT);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
