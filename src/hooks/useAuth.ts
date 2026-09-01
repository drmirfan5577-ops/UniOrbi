import { useState, useEffect, useCallback } from "react";
import type { User } from "@/types";
import { getCurrentUser, isAuthenticated, login, loginWithPasskey, logout } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passkeyLoading, setPasskeyLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
    setLoading(false);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const result = login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const signInWithPasskey = useCallback(async () => {
    setPasskeyLoading(true);
    const result = await loginWithPasskey();
    if (result.success && result.user) {
      setUser(result.user);
    }
    setPasskeyLoading(false);
    return result;
  }, []);

  const signOut = useCallback(() => {
    logout();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    passkeyLoading,
    isAuthenticated: !!user,
    signIn,
    signInWithPasskey,
    signOut,
  };
}
