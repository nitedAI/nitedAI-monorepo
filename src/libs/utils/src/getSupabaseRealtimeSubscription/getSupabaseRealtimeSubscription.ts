/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction } from 'react';
import { supabase } from '../supabase';
import { RealtimeChannel } from '@supabase/supabase-js';


interface GetSupabaseRealtimeSubscription {
  channel?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  updateCallback: Dispatch<SetStateAction<any>>;
}

export function getSupabaseRealtimeSubscription({
  channel,
  event = '*',
  schema = 'public',
  updateCallback,
}: GetSupabaseRealtimeSubscription): RealtimeChannel {
  const params = { event, schema };
  return supabase
    .channel(channel)
    .on('postgres_changes' as any, params, updateCallback)
    .subscribe();
}
