import { Shield, Lock, Zap, Globe } from "lucide-react";
import { useBranding } from "@/hooks/useBranding";

export function Footer() {
  const { branding } = useBranding();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-white">{branding.appName}</span>
                <p className="text-[10px] text-white/50">{branding.domain}</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">{branding.tagline}</p>
            <p className="text-xs text-white/40 mt-3">{branding.appSubtitle}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Security</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-cyan-400" /> Zero-Knowledge E2EE</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-blue-400" /> WebAuthn / FIDO2</li>
              <li className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-purple-400" /> Real-Time Sync</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-green-400" /> Domain Fortress</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Compliance</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>GDPR Compliant</li>
              <li>CCPA Compliant</li>
              <li>ISO 27001</li>
              <li>SOC 2 Type II</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{branding.footerText}</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>AES-256-GCM</span>
            <span>•</span>
            <span>TLS 1.3</span>
            <span>•</span>
            <span>HSTS Preloaded</span>
            <span>•</span>
            <span>FIPS 140-2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
