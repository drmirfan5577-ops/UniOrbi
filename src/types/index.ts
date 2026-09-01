export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
  mfaEnabled: boolean;
  isActive: boolean;
}

export interface Integration {
  id: string;
  name: string;
  provider: IntegrationProvider;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  credentials: Record<string, string>;
  connectedAt?: string;
  lastSync?: string;
  metadata?: Record<string, unknown>;
}

export type IntegrationProvider =
  | 'zoho_mail'
  | 'github'
  | 'netlify'
  | 'vercel'
  | 'namecheap'
  | 'godaddy'
  | 'resend'
  | 'supabase'
  | 'cloudflare'
  | 'aws';

export interface BrandingConfig {
  appName: string;
  appSubtitle: string;
  domain: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  tagline: string;
  footerText: string;
  features: {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    icon: string;
  }[];
  navItems: {
    id: string;
    label: string;
    path: string;
    visible: boolean;
  }[];
}

export interface SecurityMetric {
  label: string;
  value: string | number;
  status: 'secure' | 'warning' | 'critical';
  description: string;
}

export interface EmailAccount {
  id: string;
  address: string;
  provider: string;
  status: 'active' | 'inactive';
  unreadCount: number;
  lastSync: string;
}
