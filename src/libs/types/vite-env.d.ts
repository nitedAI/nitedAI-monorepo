/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Define other environment variables here
  // Example: readonly VITE_API_URL: string;
  // ...

  // Optionally, if you want to be more permissive
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
