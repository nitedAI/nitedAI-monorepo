/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../supabase';

export async function fetchSupabaseFunction(
  name?: string,
  params: object = {},
  callback?: React.Dispatch<React.SetStateAction<any>>,
  callbackError?: React.Dispatch<React.SetStateAction<any>>,
) {
  if (!name) return false;
  const { data, error } = await supabase.rpc(name, { ...params });

  if (error) {
    console.error(`Error fetching ${name}:`, error);
    if (callbackError) callbackError(error);
  }

  if (callback) callback(data);

  return error ? false : data;
}
