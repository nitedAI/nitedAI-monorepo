import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';

interface Channel {
  id: string;
  name: string;
  is_private: boolean;
  workspace_id: string;
  // Add any other relevant fields from your channels table
}

type Channels = Array<Channel>;

/**
 * Custom hook to fetch and subscribe to channels by workspace ID.
 * @param {string} workspaceId - The ID of the workspace to get channels for.
 * @returns {Channels} The current state of channels for the given workspace.
 */
export function useGetChannelsByWorkspaceId(workspaceId: string) {
  const { data }: { data: Channels} = useFetchSupabaseRealtimeFunction({
    name: 'get_channels_by_workspace_id',
    params: { workspace_uuid: workspaceId },
    channel: `realtime:public:channels:workspace_id=eq.${workspaceId}`,
  });

  return data;
}
