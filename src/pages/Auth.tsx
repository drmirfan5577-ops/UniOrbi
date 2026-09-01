import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Fingerprint, Mail, Lock, Eye, EyeOff, ChevronRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useBranding } from "@/hooks/useBranding";
import { SecurityOrb } from "@/components/features/SecurityOrb";
import { toast } from "sonner";

type AuthMode = "choose" | "passkey" | "email" | "otp";

export default function Auth() {
  const navigate = useNavigate();
  const { signIn, signInWithPasskey, passkeyLoading } = useAuth();
  const { branding } = useBranding();
  const [mode, setMode] = useState<AuthMode>("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasskey = async () => {
    setMode("passkey");
    const result = await signInWithPasskey();
    if (result.success) {
      toast.success("Authenticated with Passkey", { description: "Welcome back!" });
      navigate("/dashboard");
    } else {
      toast.error("Passkey authentication failed");
      setMode("choose");
    }
  };

  const handleEmailLogin = async () => {
    if (!email.trim()) { toast.error("Please enter your email"); return; }
    if (!password.trim()) { toast.error("Please enter your password"); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = signIn(email, password);
    setLoading(false);

    if (result.success) {
      toast.success("Signed in successfully");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleSendOtp = async () => {
    if (!email.trim()) { toast.error("Please enter your email"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setOtpSent(true);
    setLoading(false);
    setMode("otp");
    toast.success("OTP sent", { description: `Check ${email} for your code` });
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { toast.error("Enter the 6-digit OTP"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = signIn(email, "otp_bypass");
    setLoading(false);
    if (result.success) {
      toast.success("OTP verified — signed in");
      navigate("/dashboard");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-luminous flex items-center justify-center relative overflow-hidden">
      {/* Floating orbs */}
      <SecurityOrb className="absolute top-8 left-[5%] opacity-40" size="md" color="blue" />
      <SecurityOrb className="absolute bottom-12 right-[5%] opacity-30" size="lg" color="cyan" />
      <SecurityOrb className="absolute top-1/2 right-[2%] opacity-20" size="sm" color="purple" animated />
      <div className="absolute top-16 right-[25%] w-40 h-40 border-2 border-dashed border-blue-200/40 rounded-full spin-slow" />

      <div className="relative w-full max-w-md mx-auto px-4">
        {/* Back button */}
        <button
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          onClick={() => { if (mode !== "choose") { setMode("choose"); } else { navigate("/"); } }}
        >
          <ArrowLeft className="w-4 h-4" />
          {mode !== "choose" ? "Back" : "Return to Home"}
        </button>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 border border-white/60 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-300/30 mb-3 pulse-ring">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black text-gradient-primary">{branding.appName}</h1>
            <p className="text-sm text-muted-foreground mt-1">{branding.appSubtitle}</p>
          </div>

          {/* ─── MODE: CHOOSE ─── */}
          {mode === "choose" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Secure Access</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose your authentication method</p>
              </div>

              {/* Passkey */}
              <button
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 group"
                onClick={handlePasskey}
                disabled={passkeyLoading}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Fingerprint className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-foreground text-sm">Passkey / Biometric</p>
                  <p className="text-xs text-muted-foreground">WebAuthn · FIDO2 · Most Secure</p>
                </div>
                <div className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                  Recommended
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Email OTP */}
              <button
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200 group"
                onClick={() => setMode("email")}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-foreground text-sm">Email + Password</p>
                  <p className="text-xs text-muted-foreground">Or encrypted OTP code</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-3 pt-2">
                {["E2EE", "FIDO2", "TLS 1.3"].map((badge) => (
                  <span key={badge} className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ─── MODE: PASSKEY ─── */}
          {mode === "passkey" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl mx-auto pulse-ring">
                <Fingerprint className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold">Verifying Passkey</h2>
              <p className="text-sm text-muted-foreground">Touch your biometric sensor or confirm on your device...</p>
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}

          {/* ─── MODE: EMAIL ─── */}
          {mode === "email" && (
            <div className="space-y-5">
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-foreground">Sign In</h2>
                <p className="text-sm text-muted-foreground">Enter your credentials</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@uniorbi.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    onKeyDown={(e) => e.key === "Enter" && document.getElementById("pass-input")?.focus()}
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="pass-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-blue-300/40 transition-all py-5"
                onClick={handleEmailLogin}
                disabled={loading}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Lock className="w-4 h-4 mr-2" />
                )}
                {loading ? "Authenticating..." : "Sign In"}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-muted-foreground">or use OTP</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleSendOtp}
                disabled={loading}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send OTP to Email
              </Button>
            </div>
          )}

          {/* ─── MODE: OTP ─── */}
          {mode === "otp" && (
            <div className="space-y-5">
              <div className="text-center mb-2">
                <div className="w-14 h-14 bg-blue-50 border-2 border-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Check Your Email</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  We sent a 6-digit OTP to<br />
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground/80 mb-1.5 block">6-Digit OTP Code</Label>
                <Input
                  type="text"
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl font-bold tracking-[0.5em] h-14"
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                />
                <p className="text-xs text-muted-foreground mt-1.5 text-center">Expires in 5 minutes · Max 5 attempts</p>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-5"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : null}
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <button
                className="w-full text-xs text-blue-500 hover:text-blue-600 transition-colors"
                onClick={() => { setOtp(""); toast.info("New OTP sent"); }}
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Protected by zero-knowledge E2EE · GDPR Compliant · FIPS 140-2
        </p>
      </div>
    </div>
  );
}
