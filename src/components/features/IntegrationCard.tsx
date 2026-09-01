import { useState } from "react";
import { CheckCircle2, XCircle, Link2, Unlink, RefreshCw, ExternalLink, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Integration } from "@/types";
import { INTEGRATION_CONFIGS } from "@/constants";
import { toast } from "sonner";
import { connectIntegration, disconnectIntegration } from "@/lib/storage";

interface IntegrationCardProps {
  integration: Integration;
  onUpdate: (integrations: Integration[]) => void;
}

export function IntegrationCard({ integration, onUpdate }: IntegrationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>(integration.credentials || {});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const config = INTEGRATION_CONFIGS[integration.provider];
  if (!config) return null;

  const isConnected = integration.status === "connected";

  const handleConnect = async () => {
    const required = config.fields.filter((f) => f.required);
    const missing = required.filter((f) => !formValues[f.key]?.trim());

    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    setConnecting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const updated = connectIntegration(integration.id, formValues);
    onUpdate(updated);
    toast.success(`${config.label} connected successfully`);
    setConnecting(false);
    setExpanded(false);
  };

  const handleDisconnect = () => {
    const updated = disconnectIntegration(integration.id);
    onUpdate(updated);
    setFormValues({});
    toast.info(`${config.label} disconnected`);
  };

  return (
    <div
      className={`rounded-xl border bg-white transition-all duration-200 ${
        isConnected ? "border-green-200 shadow-sm shadow-green-100" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm"
            style={{ backgroundColor: config.color }}
          >
            {config.label.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-foreground">{config.label}</h4>
              {isConnected ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">
                  <XCircle className="w-2.5 h-2.5" /> Not Connected
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{config.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isConnected && (
            <>
              <button
                className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                title="Sync now"
                onClick={() => toast.success(`${config.label} synced`)}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                title="Disconnect"
                onClick={handleDisconnect}
              >
                <Unlink className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          {!isConnected && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => setExpanded(!expanded)}
            >
              <Link2 className="w-3 h-3 mr-1" />
              Connect
            </Button>
          )}
        </div>
      </div>

      {/* Connection Form */}
      {expanded && !isConnected && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/50 rounded-b-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/70">Enter credentials to connect</p>
            <a
              href={config.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" /> API Docs
            </a>
          </div>

          {config.fields.map((field) => (
            <div key={field.key}>
              <Label className="text-xs font-medium text-foreground/70 mb-1 block">
                {field.label}
                {field.required && <span className="text-red-400 ml-0.5">*</span>}
              </Label>
              <div className="relative">
                <Input
                  type={field.type === "password" && !showSecrets[field.key] ? "password" : "text"}
                  placeholder={field.placeholder}
                  value={formValues[field.key] || ""}
                  onChange={(e) => setFormValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="text-xs h-8 pr-8"
                />
                {field.type === "password" && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowSecrets((prev) => ({ ...prev, [field.key]: !prev[field.key] }))}
                  >
                    {showSecrets[field.key] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              className="flex-1 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs"
              onClick={handleConnect}
              disabled={connecting}
            >
              {connecting ? (
                <><RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> Connecting...</>
              ) : (
                <><Link2 className="w-3 h-3 mr-1.5" /> Connect {config.label}</>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
              onClick={() => setExpanded(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Connected details */}
      {isConnected && integration.connectedAt && (
        <div className="border-t border-green-100 px-4 py-2 bg-green-50/30 rounded-b-xl">
          <p className="text-[10px] text-green-600">
            Connected {new Date(integration.connectedAt).toLocaleDateString()} · Last sync: {integration.lastSync ? new Date(integration.lastSync).toLocaleTimeString() : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
