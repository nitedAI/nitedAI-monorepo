import { supabase } from '@utils/supabase';
import * as theme from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';

console.log(theme);
export default function App() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: theme.ThemeSupa }}
      theme="dark"
      redirectTo='/acme'
    >
      <h1>Hi</h1>
    </Auth>
  );
}
