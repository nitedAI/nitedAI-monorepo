import { supabase } from '@utils/supabase';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { AuthContext } from './auth-context';
import { AuthUserType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  workspaces: null,
  loading: true,
  session: null,
  error: null,
};

type SessionUserType = {
  aud?: string;
  avatar_url?: string | null;
  created_at?: string;
  description?: string;
  updated_at?: string | null;
  user_id?: string;
  username?: string;
  workspaces_quota?: number;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const USER_KEY = 'user';
const WORKSPACES_KEY = 'workspaces';

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useState(initialState);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) dispatch({
        ...state,
        session: data.session,
        user: transformToAuthUserType(data.session.user),
        loading: false,
        error: null,
      });
    });

    const { data } = supabase.auth.onAuthStateChange((_event) => {
      dispatch({ ...state, loading: false });
    });

    return () => data.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { data: workspaces, error: userError } = await supabase.rpc('get_user_data_and_workspaces', { user_uuid: data?.user?.id });

    const newData: AuthStateType = {
      session: data.session,
      user: {
        aud: 'authenticated',
        ...workspaces.user,
      },
      workspaces: workspaces.workspaces,
      loading: false,
      error: error || userError,
    };

    sessionStorage.setItem(USER_KEY, JSON.stringify(workspaces.user));
    sessionStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces.workspaces));
    dispatch(newData);

  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      // const data = {
      //   email,
      //   password,
      //   firstName,
      //   lastName,
      // };

    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(WORKSPACES_KEY);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  }, []);

  // ----------------------------------------------------------------------

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

function transformToAuthUserType(user: SessionUserType): AuthUserType {
  return {
    aud: user.aud || 'default-aud',
    avatar_url: user.avatar_url || null,
    created_at: user.created_at || new Date().toISOString(),
    description: user.description || '',
    updated_at: user.updated_at || null,
    user_id: user.user_id || 'default-user-id',
    username: user.username || 'default-username',
    workspaces_quota: user.workspaces_quota || 0,
  };
}
