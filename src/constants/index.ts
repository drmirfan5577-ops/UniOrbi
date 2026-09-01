import type { BrandingConfig, Integration } from "@/types";

export const DEFAULT_BRANDING: BrandingConfig = {
  appName: "UniOrbi",
  appSubtitle: "Zero-Knowledge Personal Ecosystem",
  domain: "uniorbi.com",
  primaryColor: "#2582FF",
  accentColor: "#00E6FF",
  tagline: "Your Fortress. Your Data. Your Rules.",
  footerText: "© 2026 UniOrbi — All Rights Reserved. Confidential.",
  features: [
    {
      id: "e2ee",
      name: "Zero-Knowledge E2EE",
      description: "AES-256-GCM end-to-end encryption",
      enabled: true,
      icon: "Shield",
    },
    {
      id: "webauthn",
      name: "Passkey Authentication",
      description: "WebAuthn / FIDO2 passwordless login",
      enabled: true,
      icon: "Fingerprint",
    },
    {
      id: "realtime",
      name: "Real-Time Sync",
      description: "Blind encrypted push notifications",
      enabled: true,
      icon: "Zap",
    },
    {
      id: "fortress",
      name: "Domain Fortress",
      description: "SPF, DKIM, DMARC, HSTS protection",
      enabled: true,
      icon: "Lock",
    },
  ],
  navItems: [
    { id: "home", label: "Home", path: "/", visible: true },
    { id: "dashboard", label: "Dashboard", path: "/dashboard", visible: true },
    { id: "security", label: "Security", path: "/dashboard", visible: true },
    { id: "admin", label: "Admin", path: "/admin", visible: true },
  ],
};

export const DEFAULT_INTEGRATIONS: Integration[] = [
  {
    id: "zoho_mail_1",
    name: "Zoho Mail",
    provider: "zoho_mail",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "github_1",
    name: "GitHub",
    provider: "github",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "netlify_1",
    name: "Netlify",
    provider: "netlify",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "vercel_1",
    name: "Vercel",
    provider: "vercel",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "namecheap_1",
    name: "Namecheap",
    provider: "namecheap",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "godaddy_1",
    name: "GoDaddy",
    provider: "godaddy",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "resend_1",
    name: "Resend Mail",
    provider: "resend",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "supabase_1",
    name: "Supabase",
    provider: "supabase",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "cloudflare_1",
    name: "Cloudflare",
    provider: "cloudflare",
    status: "disconnected",
    credentials: {},
  },
  {
    id: "aws_1",
    name: "AWS",
    provider: "aws",
    status: "disconnected",
    credentials: {},
  },
];

export const INTEGRATION_CONFIGS: Record<
  string,
  {
    label: string;
    color: string;
    bgColor: string;
    description: string;
    fields: { key: string; label: string; type: string; placeholder: string; required: boolean }[];
    docs: string;
  }
> = {
  zoho_mail: {
    label: "Zoho Mail",
    color: "#E42527",
    bgColor: "#FFF0F0",
    description: "Full email management — send, receive, manage via OAuth2",
    docs: "https://www.zoho.com/mail/help/api/",
    fields: [
      { key: "client_id", label: "Client ID", type: "text", placeholder: "Your Zoho Client ID", required: true },
      { key: "client_secret", label: "Client Secret", type: "password", placeholder: "Your Zoho Client Secret", required: true },
    ],
  },
  github: {
    label: "GitHub",
    color: "#24292F",
    bgColor: "#F6F8FA",
    description: "Repository management, CI/CD, and version control",
    docs: "https://docs.github.com/en/rest",
    fields: [
      { key: "access_token", label: "Personal Access Token", type: "password", placeholder: "ghp_xxxxxxxxxxxx", required: true },
      { key: "username", label: "GitHub Username", type: "text", placeholder: "your-username", required: true },
    ],
  },
  netlify: {
    label: "Netlify",
    color: "#00C7B7",
    bgColor: "#F0FFFE",
    description: "Deploy and manage sites with one-click integration",
    docs: "https://docs.netlify.com/api/get-started/",
    fields: [
      { key: "access_token", label: "Personal Access Token", type: "password", placeholder: "Your Netlify access token", required: true },
    ],
  },
  vercel: {
    label: "Vercel",
    color: "#000000",
    bgColor: "#F5F5F5",
    description: "Frontend deployments and serverless functions",
    docs: "https://vercel.com/docs/rest-api",
    fields: [
      { key: "access_token", label: "Access Token", type: "password", placeholder: "Your Vercel token", required: true },
      { key: "team_id", label: "Team ID (optional)", type: "text", placeholder: "team_xxxx", required: false },
    ],
  },
  namecheap: {
    label: "Namecheap",
    color: "#DE3723",
    bgColor: "#FFF1EF",
    description: "Domain registration and DNS management",
    docs: "https://www.namecheap.com/support/api/intro/",
    fields: [
      { key: "api_user", label: "API Username", type: "text", placeholder: "Your Namecheap username", required: true },
      { key: "api_key", label: "API Key", type: "password", placeholder: "Your Namecheap API key", required: true },
    ],
  },
  godaddy: {
    label: "GoDaddy",
    color: "#1BDBDB",
    bgColor: "#F0FFFF",
    description: "Domain and hosting management",
    docs: "https://developer.godaddy.com/doc",
    fields: [
      { key: "api_key", label: "API Key", type: "text", placeholder: "Your GoDaddy API key", required: true },
      { key: "api_secret", label: "API Secret", type: "password", placeholder: "Your GoDaddy API secret", required: true },
    ],
  },
  resend: {
    label: "Resend Mail",
    color: "#000000",
    bgColor: "#F5F5F5",
    description: "Transactional email delivery platform",
    docs: "https://resend.com/docs/api-reference/introduction",
    fields: [
      { key: "api_key", label: "API Key", type: "password", placeholder: "re_xxxxxxxxxxxx", required: true },
      { key: "from_domain", label: "From Domain", type: "text", placeholder: "mail@uniorbi.com", required: true },
    ],
  },
  supabase: {
    label: "Supabase",
    color: "#3ECF8E",
    bgColor: "#F0FFF8",
    description: "Open source Firebase alternative — auth, database, storage",
    docs: "https://supabase.com/docs/reference",
    fields: [
      { key: "project_url", label: "Project URL", type: "text", placeholder: "https://xxxx.supabase.co", required: true },
      { key: "anon_key", label: "Anon Key", type: "password", placeholder: "Your Supabase anon key", required: true },
      { key: "service_key", label: "Service Role Key", type: "password", placeholder: "Your service key", required: false },
    ],
  },
  cloudflare: {
    label: "Cloudflare",
    color: "#F48120",
    bgColor: "#FFF7EF",
    description: "WAF, DDoS protection, CDN, and DNS management",
    docs: "https://developers.cloudflare.com/api/",
    fields: [
      { key: "api_token", label: "API Token", type: "password", placeholder: "Your Cloudflare API token", required: true },
      { key: "account_id", label: "Account ID", type: "text", placeholder: "Your account ID", required: true },
    ],
  },
  aws: {
    label: "Amazon AWS",
    color: "#FF9900",
    bgColor: "#FFFBF0",
    description: "Cloud infrastructure, S3, Lambda, and more",
    docs: "https://docs.aws.amazon.com/",
    fields: [
      { key: "access_key_id", label: "Access Key ID", type: "text", placeholder: "AKIAIOSFODNN7EXAMPLE", required: true },
      { key: "secret_access_key", label: "Secret Access Key", type: "password", placeholder: "Your secret access key", required: true },
      { key: "region", label: "Region", type: "text", placeholder: "us-east-1", required: true },
    ],
  },
};

export const ADMIN_PASSWORD = "1122";
