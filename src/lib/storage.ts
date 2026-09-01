import type { Integration, BrandingConfig } from "@/types";
import { DEFAULT_BRANDING, DEFAULT_INTEGRATIONS } from "@/constants";

const INTEGRATIONS_KEY = "uniorbi_integrations";
const BRANDING_KEY = "uniorbi_branding";

export function getIntegrations(): Integration[] {
  const raw = localStorage.getItem(INTEGRATIONS_KEY);
  if (!raw) return DEFAULT_INTEGRATIONS;
  try {
    return JSON.parse(raw) as Integration[];
  } catch {
    return DEFAULT_INTEGRATIONS;
  }
}

export function saveIntegrations(integrations: Integration[]): void {
  localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(integrations));
}

export function connectIntegration(id: string, credentials: Record<string, string>): Integration[] {
  const integrations = getIntegrations();
  const updated = integrations.map((i) =>
    i.id === id
      ? {
          ...i,
          status: "connected" as const,
          credentials,
          connectedAt: new Date().toISOString(),
          lastSync: new Date().toISOString(),
        }
      : i
  );
  saveIntegrations(updated);
  return updated;
}

export function disconnectIntegration(id: string): Integration[] {
  const integrations = getIntegrations();
  const updated = integrations.map((i) =>
    i.id === id ? { ...i, status: "disconnected" as const, credentials: {}, connectedAt: undefined } : i
  );
  saveIntegrations(updated);
  return updated;
}

export function getBranding(): BrandingConfig {
  const raw = localStorage.getItem(BRANDING_KEY);
  if (!raw) return DEFAULT_BRANDING;
  try {
    return JSON.parse(raw) as BrandingConfig;
  } catch {
    return DEFAULT_BRANDING;
  }
}

export function saveBranding(config: BrandingConfig): void {
  localStorage.setItem(BRANDING_KEY, JSON.stringify(config));
}

export function resetBranding(): BrandingConfig {
  saveBranding(DEFAULT_BRANDING);
  return DEFAULT_BRANDING;
}
