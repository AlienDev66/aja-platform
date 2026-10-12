"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  can,
  demoAccounts,
  type Permission,
  type Role,
  roleLabels,
} from "./rbac";

export type SessionUser = {
  role: Role;
  name: string;
  email: string;
  title: string;
  province: string;
  memberId: string;
};

type AuthCtx = {
  user: SessionUser | null;
  ready: boolean;
  login: (role: Role) => void;
  logout: () => void;
  can: (p: Permission) => boolean;
  roleLabel: string;
};

const AuthContext = createContext<AuthCtx | null>(null);
const KEY = "aja-digital-session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((role: Role) => {
    const account = demoAccounts.find((a) => a.role === role)!;
    const session: SessionUser = { ...account };
    localStorage.setItem(KEY, JSON.stringify(session));
    setUser(session);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      ready,
      login,
      logout,
      can: (p) => (user ? can(user.role, p) : false),
      roleLabel: user ? roleLabels[user.role] : "",
    }),
    [user, ready, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
}
