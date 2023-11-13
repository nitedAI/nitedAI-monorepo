import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';
import { useParams } from 'react-router-dom';

interface Channel {
  id: string;
  name: string;
  is_private: boolean;
  workspace_id: string;
  // Add any other relevant fields from your channels table
}

type Channels = Array<Channel>;

export function useGetChannelsByWorkspaceSlug() {
  const { slug } = useParams();
  const { data: channels }: { data: Channels } = useFetchSupabaseRealtimeFunction({
    name: 'get_channels_by_workspace_slug',
    params: { workspace_slug: slug },
    channel: `realtime:public:channels`,
  });

  return channels;
}
