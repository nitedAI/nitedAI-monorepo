// API
// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_API;
// export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

export const AUTH0_API = {
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL,
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = '/'; // as '/dashboard'

export const SUPABASE_API_URL = import.meta.env.VITE_SUPABASE_API_URL;
export const SUPABASE_DB_URL = import.meta.env.VITE_SUPABASE_DB_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
