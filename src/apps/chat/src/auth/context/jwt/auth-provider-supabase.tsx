import { useMemo, useEffect, useReducer, useCallback, useState } from 'react';

import { createClient } from '@supabase/supabase-js';

import { AuthContext } from './auth-context';
import { AuthStateType } from '../../types';

import { SUPABASE_API_URL, SUPABASE_ANON_KEY } from 'src/config-global';

const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  session: null,
  error: null,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useState(initialState);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) dispatch({
        session: data.session,
        user: data.session.user,
        loading: false,
        error: null,
      });
    });

    const { data } = supabase.auth.onAuthStateChange((_event) => {
      dispatch({ loading: false });
    });

    return () => data.subscription.unsubscribe();
  }, []);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'paulo@nited.ai',
      password: '123456',
    });

    dispatch(data);
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  }, []);

  // ----------------------------------------------------------------------
console.log(state);
  const checkAuthenticated = state?.user?.aud === 'authenticated' ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
