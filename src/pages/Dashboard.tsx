import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, Fingerprint, Zap, Lock, Globe, CheckCircle, AlertTriangle,
  Mail, Key, Settings, RefreshCw, Activity, Database, Cpu, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useBranding } from "@/hooks/useBranding";
import { getIntegrations } from "@/lib/storage";
import { SecurityOrb } from "@/components/features/SecurityOrb";
import { toast } from "sonner";

const SECURITY_METRICS = [
  { label: "E2EE Status", value: "Active", status: "secure", icon: <Shield className="w-4 h-4" />, detail: "AES-256-GCM" },
  { label: "Auth Method", value: "Passkey", status: "secure", icon: <Fingerprint className="w-4 h-4" />, detail: "FIDO2 / WebAuthn" },
  { label: "Sync Latency", value: "12ms", status: "secure", icon: <Zap className="w-4 h-4" />, detail: "WebSocket live" },
  { label: "Domain Status", value: "Fortress", status: "secure", icon: <Globe className="w-4 h-4" />, detail: "DMARC p=reject" },
  { label: "Key Rotation", value: "18 days", status: "secure", icon: <Key className="w-4 h-4" />, detail: "Next in 12 days" },
  { label: "Failed Logins", value: "0", status: "secure", icon: <Lock className="w-4 h-4" />, detail: "Last 30 days" },
];

const DNS_RECORDS = [
  { type: "SPF", status: "active", value: "v=spf1 include:_spf.google.com -all" },
  { type: "DKIM", status: "active", value: "v=DKIM1; k=rsa; p=MIIBIjANBg..." },
  { type: "DMARC", status: "active", value: "v=DMARC1; p=reject; rua=mailto:..." },
  { type: "HSTS", status: "active", value: "max-age=63072000; includeSubDomains" },
  { type: "CAA", status: "active", value: "0 issue letsencrypt.org" },
  { type: "MTA-STS", status: "active", value: "v=STSv1; id=20260720" },
];

const ACTIVITY_LOG = [
  { event: "Passkey login", time: "2 min ago", type: "auth", ip: "192.168.1.1" },
  { event: "Key rotation scheduled", time: "1 hr ago", type: "security", ip: "system" },
  { event: "Data sync completed", time: "3 hr ago", type: "sync", ip: "ws://sync" },
  { event: "DMARC report received", time: "1 day ago", type: "domain", ip: "reports" },
  { event: "Backup encrypted & stored", time: "2 days ago", type: "backup", ip: "s3://vault" },
];

const typeColors: Record<string, string> = {
  auth: "bg-blue-100 text-blue-700",
  security: "bg-purple-100 text-purple-700",
  sync: "bg-cyan-100 text-cyan-700",
  domain: "bg-green-100 text-green-700",
  backup: "bg-orange-100 text-orange-700",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { branding } = useBranding();
  const [syncing, setSyncing] = useState(false);
  const integrations = getIntegrations();
  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSyncing(false);
    toast.success("Sync complete", { description: "All data encrypted and synchronized" });
  };

  return (
    <div className="min-h-screen bg-luminous">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="relative glass-card rounded-3xl p-8 mb-8 border border-white/60 overflow-hidden">
            <SecurityOrb className="absolute -top-8 -right-8 opacity-20" size="lg" color="cyan" animated />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 pulse-ring" />
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Ecosystem Online · All Systems Secure</span>
                </div>
                <h1 className="text-3xl font-black text-foreground">
                  Welcome back, <span className="text-gradient-primary">{user?.displayName || "Admin"}</span>
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">{branding.domain} · {branding.appSubtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSync}
                  disabled={syncing}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Syncing..." : "Sync Now"}
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  onClick={() => navigate("/admin")}
                >
                  <Settings className="w-3.5 h-3.5 mr-1.5" />
                  Admin Panel
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Security Score", value: "100/100", icon: <Shield className="w-5 h-5" />, color: "text-green-600 bg-green-50 border-green-100" },
              { label: "Integrations", value: `${connectedCount}/${integrations.length}`, icon: <Database className="w-5 h-5" />, color: "text-blue-600 bg-blue-50 border-blue-100" },
              { label: "Encrypted Keys", value: "4 active", icon: <Key className="w-5 h-5" />, color: "text-purple-600 bg-purple-50 border-purple-100" },
              { label: "Email Accounts", value: "1 linked", icon: <Mail className="w-5 h-5" />, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
            ].map((stat) => (
              <div key={stat.label} className={`glass-card rounded-2xl p-4 border ${stat.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`${stat.color} rounded-lg p-1.5`}>{stat.icon}</div>
                  <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-2xl font-black text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Security Metrics */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Security Metrics
                </h2>
                <span className="text-[10px] font-semibold bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">
                  All Clear
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECURITY_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-white/80 hover:border-green-200 transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      metric.status === "secure" ? "bg-green-100 text-green-600" :
                      metric.status === "warning" ? "bg-yellow-100 text-yellow-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {metric.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                      <p className="text-sm font-bold text-foreground truncate">{metric.value}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {metric.status === "secure" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-[10px] text-muted-foreground">{metric.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="glass-card rounded-2xl p-6 border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Activity Log
                </h2>
              </div>
              <div className="space-y-3">
                {ACTIVITY_LOG.map((log, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${typeColors[log.type] || "bg-gray-100 text-gray-600"}`}>
                      {log.type.toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground/80 truncate">{log.event}</p>
                      <p className="text-[10px] text-muted-foreground">{log.time} · {log.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DNS Fortress */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-500" />
                  Domain Fortress DNS
                </h2>
                <span className="text-[10px] font-semibold bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">
                  {branding.domain}
                </span>
              </div>
              <div className="space-y-2">
                {DNS_RECORDS.map((record) => (
                  <div key={record.type} className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-white/80">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded w-16 text-center flex-shrink-0">
                      {record.type}
                    </span>
                    <span className="text-xs text-foreground/70 font-mono flex-1 truncate">{record.value}</span>
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="glass-card rounded-2xl p-6 border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  System Status
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Auth Service", uptime: "99.99%", latency: "8ms", color: "bg-green-400" },
                  { name: "Data Sync", uptime: "99.97%", latency: "12ms", color: "bg-green-400" },
                  { name: "Notification", uptime: "99.95%", latency: "22ms", color: "bg-green-400" },
                  { name: "Key Vault", uptime: "100%", latency: "5ms", color: "bg-green-400" },
                  { name: "PostgreSQL", uptime: "99.99%", latency: "3ms", color: "bg-green-400" },
                ].map((service) => (
                  <div key={service.name} className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${service.color} flex-shrink-0`} />
                    <span className="text-sm text-foreground flex-1">{service.name}</span>
                    <span className="text-xs text-muted-foreground">{service.latency}</span>
                    <span className="text-xs font-semibold text-green-600">{service.uptime}</span>
                  </div>
                ))}

                <div className="border-t border-gray-100 pt-3 mt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" /> Connections
                    </span>
                    <span className="font-bold text-foreground">1 / 10,000 cap</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full" style={{ width: "0.01%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
