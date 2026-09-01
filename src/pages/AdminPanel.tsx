import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, Lock, Settings, Link2, Palette, Eye, EyeOff,
  ChevronRight, ArrowLeft, Save, RotateCcw, CheckCircle,
  ToggleLeft, ToggleRight, Globe, Type, Layers, Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { IntegrationCard } from "@/components/features/IntegrationCard";
import { useBranding } from "@/hooks/useBranding";
import { getIntegrations } from "@/lib/storage";
import type { Integration } from "@/types";
import { ADMIN_PASSWORD } from "@/constants";
import { SecurityOrb } from "@/components/features/SecurityOrb";
import { toast } from "sonner";

type AdminTab = "integrations" | "branding" | "features" | "navigation";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [tab, setTab] = useState<AdminTab>("integrations");
  const [integrations, setIntegrations] = useState<Integration[]>(getIntegrations);
  const { branding, updateBranding, updateFeature, updateNavItem, reset } = useBranding();
  const [localBranding, setLocalBranding] = useState(branding);

  const handleUnlock = () => {
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      toast.success("Admin panel unlocked");
    } else {
      setLoginAttempts((p) => p + 1);
      toast.error(`Incorrect password. ${5 - loginAttempts - 1} attempts remaining.`);
      setPassword("");
      if (loginAttempts >= 4) {
        toast.error("Too many attempts. Locked for 15 minutes.");
      }
    }
  };

  const handleSaveBranding = () => {
    updateBranding(localBranding);
    toast.success("Branding saved successfully", { description: "Changes applied across the app" });
  };

  const handleResetBranding = () => {
    reset();
    setLocalBranding(branding);
    toast.info("Branding reset to defaults");
  };

  const TABS: { id: AdminTab; label: string; icon: JSX.Element }[] = [
    { id: "integrations", label: "Integrations", icon: <Link2 className="w-4 h-4" /> },
    { id: "branding", label: "Branding", icon: <Palette className="w-4 h-4" /> },
    { id: "features", label: "Features", icon: <Layers className="w-4 h-4" /> },
    { id: "navigation", label: "Navigation", icon: <Navigation className="w-4 h-4" /> },
  ];

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-luminous flex items-center justify-center relative overflow-hidden">
        <SecurityOrb className="absolute top-8 left-[8%] opacity-40" size="lg" color="blue" />
        <SecurityOrb className="absolute bottom-12 right-[8%] opacity-30" size="md" color="purple" animated />

        <div className="relative w-full max-w-md mx-auto px-4">
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </button>

          <div className="glass-card rounded-3xl p-8 border border-white/60 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-purple-300/30 mb-3 pulse-ring">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-black text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground mt-1">Restricted access · Strong password required</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">Admin Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    disabled={loginAttempts >= 5}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">Default password: 1122 (change after first login)</p>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md py-5"
                onClick={handleUnlock}
                disabled={loginAttempts >= 5}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock Admin Panel
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              {loginAttempts > 0 && loginAttempts < 5 && (
                <p className="text-xs text-red-500 text-center">
                  {5 - loginAttempts} attempts remaining before lockout
                </p>
              )}
              {loginAttempts >= 5 && (
                <p className="text-xs text-red-600 text-center font-semibold">
                  Account locked. Try again in 15 minutes.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luminous">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="glass-card rounded-2xl p-6 mb-6 border border-white/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-foreground">Admin Panel</h1>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full uppercase">
                    Restricted
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Manage integrations, branding, features & navigation</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => { setUnlocked(false); setPassword(""); }}
            >
              <Lock className="w-3.5 h-3.5 mr-1.5" /> Lock
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/70 rounded-xl border border-gray-100 mb-6 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex-1 justify-center ${
                  tab === t.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/80"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* ─── TAB: INTEGRATIONS ─── */}
          {tab === "integrations" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Platform Integrations</h2>
                  <p className="text-sm text-muted-foreground">Connect external services with one-click integration</p>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {integrations.filter((i) => i.status === "connected").length} / {integrations.length} connected
                </div>
              </div>

              {/* Zoho Mail featured */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#E42527] flex items-center justify-center text-white text-[10px] font-bold">Z</div>
                  <span className="text-sm font-bold text-red-700">Zoho Mail — Priority Integration</span>
                  <span className="text-[10px] bg-red-100 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-full">Core</span>
                </div>
                <p className="text-xs text-red-600/80 mb-1">Full email management: send, receive, operate, manage with zero compromise. Requires only Client ID + Client Secret.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {integrations.map((integration) => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                    onUpdate={setIntegrations}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ─── TAB: BRANDING ─── */}
          {tab === "branding" && (
            <div className="max-w-2xl">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-foreground">Branding & Identity</h2>
                <p className="text-sm text-muted-foreground">Customize app name, subtitle, domain, colors, and text — all fully replaceable</p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-white/60 space-y-5">
                {[
                  { key: "appName", label: "App Name", placeholder: "UniOrbi", icon: <Type className="w-4 h-4" /> },
                  { key: "appSubtitle", label: "App Subtitle", placeholder: "Zero-Knowledge Personal Ecosystem", icon: <Type className="w-4 h-4" /> },
                  { key: "domain", label: "Domain", placeholder: "uniorbi.com", icon: <Globe className="w-4 h-4" /> },
                  { key: "tagline", label: "Tagline", placeholder: "Your Fortress. Your Data. Your Rules.", icon: <Type className="w-4 h-4" /> },
                  { key: "footerText", label: "Footer Text", placeholder: "© 2026 UniOrbi", icon: <Type className="w-4 h-4" /> },
                ].map((field) => (
                  <div key={field.key}>
                    <Label className="text-sm font-medium text-foreground/80 mb-1.5 flex items-center gap-1.5 block">
                      {field.icon} {field.label}
                    </Label>
                    <Input
                      placeholder={field.placeholder}
                      value={(localBranding as Record<string, string>)[field.key] || ""}
                      onChange={(e) => setLocalBranding((p) => ({ ...p, [field.key]: e.target.value }))}
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localBranding.primaryColor}
                        onChange={(e) => setLocalBranding((p) => ({ ...p, primaryColor: e.target.value }))}
                        className="w-10 h-10 rounded-lg border cursor-pointer"
                      />
                      <Input
                        value={localBranding.primaryColor}
                        onChange={(e) => setLocalBranding((p) => ({ ...p, primaryColor: e.target.value }))}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={localBranding.accentColor}
                        onChange={(e) => setLocalBranding((p) => ({ ...p, accentColor: e.target.value }))}
                        className="w-10 h-10 rounded-lg border cursor-pointer"
                      />
                      <Input
                        value={localBranding.accentColor}
                        onChange={(e) => setLocalBranding((p) => ({ ...p, accentColor: e.target.value }))}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                    onClick={handleSaveBranding}
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Branding
                  </Button>
                  <Button variant="outline" onClick={handleResetBranding}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: FEATURES ─── */}
          {tab === "features" && (
            <div className="max-w-2xl">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-foreground">Feature Management</h2>
                <p className="text-sm text-muted-foreground">Enable, disable, rename, or update feature descriptions</p>
              </div>

              <div className="space-y-3">
                {branding.features.map((feature) => (
                  <div key={feature.id} className="glass-card rounded-xl p-5 border border-white/60">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${feature.enabled ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                          {feature.icon === "Shield" && <Shield className="w-4 h-4" />}
                          {feature.icon === "Fingerprint" && <CheckCircle className="w-4 h-4" />}
                          {feature.icon === "Zap" && <CheckCircle className="w-4 h-4" />}
                          {feature.icon === "Lock" && <Lock className="w-4 h-4" />}
                        </div>
                        <span className="font-semibold text-sm text-foreground">{feature.name}</span>
                      </div>
                      <button
                        onClick={() => updateFeature(feature.id, { enabled: !feature.enabled })}
                        className={`flex-shrink-0 transition-colors ${feature.enabled ? "text-blue-500" : "text-gray-300"}`}
                      >
                        {feature.enabled
                          ? <ToggleRight className="w-6 h-6" />
                          : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Feature Name</Label>
                        <Input
                          value={feature.name}
                          onChange={(e) => updateFeature(feature.id, { name: e.target.value })}
                          className="text-sm h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Description</Label>
                        <Input
                          value={feature.description}
                          onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                          className="text-sm h-8"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TAB: NAVIGATION ─── */}
          {tab === "navigation" && (
            <div className="max-w-2xl">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-foreground">Navigation Management</h2>
                <p className="text-sm text-muted-foreground">Rename, show/hide, or modify navigation items</p>
              </div>

              <div className="space-y-3">
                {branding.navItems.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-5 border border-white/60">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-semibold text-sm text-foreground">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground font-mono">{item.path}</span>
                        <button
                          onClick={() => updateNavItem(item.id, { visible: !item.visible })}
                          className={`flex-shrink-0 transition-colors ${item.visible ? "text-blue-500" : "text-gray-300"}`}
                        >
                          {item.visible
                            ? <ToggleRight className="w-6 h-6" />
                            : <ToggleLeft className="w-6 h-6" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Label</Label>
                        <Input
                          value={item.label}
                          onChange={(e) => updateNavItem(item.id, { label: e.target.value })}
                          className="text-sm h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Path</Label>
                        <Input
                          value={item.path}
                          onChange={(e) => updateNavItem(item.id, { path: e.target.value })}
                          className="text-sm h-8 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
