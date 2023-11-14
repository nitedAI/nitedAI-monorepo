import { useState, useEffect } from 'react';
import { supabase } from '@utils/supabase';

export function useGetAuthUser() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      setUser(res?.data?.session?.user?.id || null);
    });
  }, []);

  return user;
}
