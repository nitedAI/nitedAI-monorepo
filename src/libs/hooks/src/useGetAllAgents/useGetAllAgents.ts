import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';

interface Agent {
  id: string;
  display: string;
  // Add any other relevant fields from your channels table
}

type Agents = Array<Agent>;

/**
 * Custom hook to fetch and subscribe to channels by workspace ID.
 * @param  channelId - The ID of the workspace to get channels for.
 * @returns List of users on current channel.
 */
export function useGetAllAgents() {
  const { data }: { data: Agents } = useFetchSupabaseRealtimeFunction({
    name: 'get_all_agents',
  });

  return data;
}
