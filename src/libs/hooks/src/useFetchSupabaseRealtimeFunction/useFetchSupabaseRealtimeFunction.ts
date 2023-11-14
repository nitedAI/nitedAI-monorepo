import { fetchSupabaseFunction, getSupabaseRealtimeSubscription, supabase } from '@utils';
import { useState, useEffect, useRef } from 'react';

interface GetSupabaseRealtimeFunctionProps {
  name?: string;
  params?: Record<string, unknown>;
  channel?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
}

export function useFetchSupabaseRealtimeFunction({ name, params, channel, event = '*' }: GetSupabaseRealtimeFunctionProps) {
  const [data, setState] = useState([]);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const subscription = getSupabaseRealtimeSubscription({
    channel,
    event,
    updateCallback: () => fetchSupabaseFunction(name, params, setState, setError),
  });

  useEffect(() => {
    if (hasFetched.current) {
      return; // If we've already fetched, do not fetch again
    }
    hasFetched.current = true;
    fetchSupabaseFunction(name, params, setState, setError);

    return () => {
      if (subscription) supabase.removeChannel(subscription);
      hasFetched.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => fetchSupabaseFunction(name, params, setState, setError);

  return { data, error, refetch };
}
