import { useState, useCallback } from "react";
import type { BrandingConfig } from "@/types";
import { getBranding, saveBranding, resetBranding } from "@/lib/storage";

export function useBranding() {
  const [branding, setBranding] = useState<BrandingConfig>(getBranding);

  const updateBranding = useCallback((updates: Partial<BrandingConfig>) => {
    const updated = { ...branding, ...updates };
    saveBranding(updated);
    setBranding(updated);
  }, [branding]);

  const reset = useCallback(() => {
    const defaults = resetBranding();
    setBranding(defaults);
  }, []);

  const updateFeature = useCallback((featureId: string, updates: Partial<BrandingConfig["features"][0]>) => {
    const updated = {
      ...branding,
      features: branding.features.map((f) =>
        f.id === featureId ? { ...f, ...updates } : f
      ),
    };
    saveBranding(updated);
    setBranding(updated);
  }, [branding]);

  const updateNavItem = useCallback((itemId: string, updates: Partial<BrandingConfig["navItems"][0]>) => {
    const updated = {
      ...branding,
      navItems: branding.navItems.map((n) =>
        n.id === itemId ? { ...n, ...updates } : n
      ),
    };
    saveBranding(updated);
    setBranding(updated);
  }, [branding]);

  return { branding, updateBranding, updateFeature, updateNavItem, reset };
}
