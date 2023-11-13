/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly [key: string]: string | boolean | undefined;
    // Define explicit types for known environment variables, e.g.:
    readonly VITE_API_URL?: string;
    // Add other environment variables as needed
  };
}
