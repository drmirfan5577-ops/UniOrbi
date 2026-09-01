import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Menu, X, ChevronRight, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useBranding } from "@/hooks/useBranding";
import { toast } from "sonner";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { branding } = useBranding();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    toast.success("Signed out securely");
    navigate("/");
  };

  const visibleNavItems = branding.navItems.filter((n) => n.visible);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md group-hover:shadow-blue-300/50 transition-all duration-200">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-gradient-primary">{branding.appName}</span>
              <span className="hidden sm:block text-[10px] text-muted-foreground leading-none">{branding.domain}</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {visibleNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-blue-50 transition-all duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 text-muted-foreground"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex text-muted-foreground"
                  onClick={() => navigate("/admin")}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md hover:shadow-blue-300/40 transition-all duration-200"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </>
            )}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-white/40 px-4 pb-4 pt-2">
          {visibleNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-blue-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {!user && (
            <Button
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              onClick={() => { navigate("/auth"); setMobileOpen(false); }}
            >
              Sign In
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
