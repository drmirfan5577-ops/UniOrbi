import { useNavigate } from "react-router-dom";
import {
  Shield, Fingerprint, Zap, Lock, ChevronRight, CheckCircle,
  Globe, Server, Eye, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PillarCard } from "@/components/features/PillarCard";
import { SecurityOrb } from "@/components/features/SecurityOrb";
import { useBranding } from "@/hooks/useBranding";
import heroImg from "@/assets/hero-bg.jpg";

const PILLARS = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Zero-Knowledge E2EE",
    subtitle: "Military-Grade Encryption Core",
    description: "Server stores only ciphertext. Decryption keys exist only on your device. AES-256-GCM with X25519 key exchange.",
    specs: ["AES-256-GCM", "X25519", "FIPS 140-2 L3", "30-day rotation"],
    color: "blue" as const,
  },
  {
    icon: <Fingerprint className="w-6 h-6" />,
    title: "Passkey Authentication",
    subtitle: "Frictionless & Fortified",
    description: "Password-less login via WebAuthn/FIDO2. Biometric authentication with step-up security for new devices.",
    specs: ["WebAuthn", "FIDO2", "TOTP backup", "JWT 15min"],
    color: "purple" as const,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time Blind Sync",
    subtitle: "<50ms Latency",
    description: "Ultra-fast, encrypted data delivery. Push notifications carry only hash references — zero payload exposure.",
    specs: ["WebSocket", "gRPC", "<50ms", "IndexedDB"],
    color: "cyan" as const,
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Domain Fortress",
    subtitle: "@uniorbi.com Protected",
    description: "Impenetrable domain reputation. SPF, DKIM, DMARC (p=reject), HSTS preloaded, CAA DNS records.",
    specs: ["SPF", "DKIM", "DMARC p=reject", "HSTS 2yr"],
    color: "green" as const,
  },
];

const STATS = [
  { value: "AES-256", label: "Encryption", icon: <Shield className="w-4 h-4" /> },
  { value: "<50ms", label: "Sync Latency", icon: <Zap className="w-4 h-4" /> },
  { value: "99.99%", label: "Uptime SLA", icon: <Server className="w-4 h-4" /> },
  { value: "0 KB", label: "Plaintext on Server", icon: <Eye className="w-4 h-4" /> },
];

export default function Index() {
  const navigate = useNavigate();
  const { branding } = useBranding();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 bg-luminous" />

        {/* Hero image overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />

        {/* Floating orbs */}
        <SecurityOrb className="absolute top-24 left-[8%] opacity-40" size="lg" color="blue" />
        <SecurityOrb className="absolute bottom-32 right-[6%] opacity-30" size="md" color="cyan" animated />
        <SecurityOrb className="absolute top-1/2 left-[3%] opacity-20" size="sm" color="purple" />
        <SecurityOrb className="absolute top-1/3 right-[12%] opacity-25" size="sm" color="blue" animated />

        {/* Spinning ring */}
        <div className="absolute top-24 right-[20%] w-48 h-48 border-2 border-dashed border-blue-200/40 rounded-full spin-slow" />
        <div className="absolute bottom-40 left-[15%] w-32 h-32 border border-cyan-300/30 rounded-full orb-float-reverse" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-ring" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
              Zero-Knowledge · Military-Grade Security · Live
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
            <span className="text-foreground">Your Personal</span>
            <br />
            <span className="text-gradient-primary">{branding.appName}</span>
            <br />
            <span className="text-3xl sm:text-4xl font-bold text-foreground/70">Fortress</span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-4">
            {branding.appSubtitle}
          </p>
          <p className="text-base text-foreground/50 max-w-xl mx-auto mb-10">
            {branding.tagline}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-blue-400/40 transition-all duration-300 px-8 py-6 text-base rounded-xl"
              onClick={() => navigate("/auth")}
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              Enter with Passkey
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-200"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-4 border border-white/60">
                <div className="flex items-center justify-center gap-1.5 text-blue-500 mb-2">
                  {stat.icon}
                  <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-xl font-black text-gradient-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">4 Core Pillars</span>
            </div>
            <h2 className="text-4xl font-black text-foreground mb-4">
              Engineered for <span className="text-gradient-primary">Absolute Security</span>
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Every layer of {branding.appName} is hardened with military-grade protocols, zero-trust architecture, and compliance with GDPR, CCPA, ISO 27001, and SOC 2 Type II.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} {...pillar} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <SecurityOrb className="absolute -top-12 -right-12 opacity-20 w-64 h-64" color="cyan" animated />
        <SecurityOrb className="absolute -bottom-12 -left-12 opacity-15 w-48 h-48" color="purple" animated />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              Zero-Trust <span className="text-gradient-primary">Microservices</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">Full-stack encryption pipeline from client to database, with mTLS and JWT validation at every hop.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Edge Security",
                items: ["Cloudflare Enterprise WAF", "DDoS Protection", "Bot Management", "Rate Limiting"],
                color: "text-cyan-400 border-cyan-800",
                icon: <Globe className="w-5 h-5 text-cyan-400" />,
              },
              {
                title: "API Gateway Layer",
                items: ["Kong API Gateway", "JWT Validation", "mTLS Termination", "1000 req/min limit"],
                color: "text-blue-400 border-blue-800",
                icon: <Server className="w-5 h-5 text-blue-400" />,
              },
              {
                title: "Data Layer",
                items: ["PostgreSQL + RLS", "Redis Cache/PubSub", "HashiCorp Vault", "S3 Encrypted Backups"],
                color: "text-purple-400 border-purple-800",
                icon: <Lock className="w-5 h-5 text-purple-400" />,
              },
            ].map((layer) => (
              <div key={layer.title} className={`glass-card-dark rounded-2xl p-6 border ${layer.color}`}>
                <div className="flex items-center gap-2 mb-4">
                  {layer.icon}
                  <h3 className="font-bold text-white">{layer.title}</h3>
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl hover:shadow-blue-500/30 transition-all px-8 py-6 text-base rounded-xl"
              onClick={() => navigate("/auth")}
            >
              Access Your Ecosystem
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
