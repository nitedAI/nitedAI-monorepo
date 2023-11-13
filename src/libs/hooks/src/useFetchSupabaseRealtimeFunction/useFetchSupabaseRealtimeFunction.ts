import { fetchSupabaseFunction, getSupabaseRealtimeSubscription, supabase } from '@utils';
import { useState, useEffect } from 'react';

interface GetSupabaseRealtimeFunctionProps {
  name?: string;
  params?: Record<string, unknown>;
  channel?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
}

export function useFetchSupabaseRealtimeFunction({ name, params, channel, event = '*' }: GetSupabaseRealtimeFunctionProps) {
  const [data, setState] = useState([]);
  const [error, setError] = useState(null);

  const subscription = getSupabaseRealtimeSubscription({
    channel,
    event,
    updateCallback: () => fetchSupabaseFunction(name, params, setState, setError),
  });

  useEffect(() => {
    fetchSupabaseFunction(name, params, setState, setError);

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => fetchSupabaseFunction(name, params, setState, setError);

  return { data, error, refetch };
}
