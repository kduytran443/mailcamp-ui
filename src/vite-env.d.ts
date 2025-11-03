/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_OAUTH2_GOOGLE_LOGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
