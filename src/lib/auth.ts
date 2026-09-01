import type { User } from "@/types";

const USER_KEY = "uniorbi_user";
const SESSION_KEY = "uniorbi_session";

export const mockUser: User = {
  id: "usr_01J9KX2ABCDEF12345",
  email: "admin@uniorbi.com",
  username: "admin",
  displayName: "UniOrbi Admin",
  createdAt: "2026-01-01T00:00:00Z",
  lastLogin: new Date().toISOString(),
  mfaEnabled: true,
  isActive: true,
};

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  if (email && password.length >= 4) {
    const user = { ...mockUser, email, displayName: email.split("@")[0] };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token: "mock_jwt_" + Date.now(), expiresAt: Date.now() + 15 * 60 * 1000 }));
    return { success: true, user };
  }
  return { success: false, error: "Invalid credentials" };
}

export function loginWithPasskey(): Promise<{ success: boolean; user?: User; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token: "passkey_jwt_" + Date.now(), expiresAt: Date.now() + 15 * 60 * 1000 }));
      resolve({ success: true, user: mockUser });
    }, 1500);
  });
}

export function logout(): void {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;
  try {
    const parsed = JSON.parse(session) as { token: string; expiresAt: number };
    return Date.now() < parsed.expiresAt;
  } catch {
    return false;
  }
}

export function updateUser(updates: Partial<User>): User | null {
  const user = getCurrentUser();
  if (!user) return null;
  const updated = { ...user, ...updates };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  return updated;
}
