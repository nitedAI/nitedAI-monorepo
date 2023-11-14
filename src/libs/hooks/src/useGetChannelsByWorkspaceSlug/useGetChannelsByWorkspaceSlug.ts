import { useEffect } from 'react';
import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';
import { useParams } from 'react-router-dom';

interface Channel {
  id: string;
  name: string;
  is_private: boolean;
  workspace_id: string;
}

interface Response {
  data: Array<Channel>;
  refetch: () => void;
}

export function useGetChannelsByWorkspaceSlug() {
  const { slug } = useParams();

  const { data: channels, refetch }: Response = useFetchSupabaseRealtimeFunction({
    name: 'get_channels_by_workspace_slug',
    params: { workspace_slug: slug },
    channel: `realtime:public:channels`,
  });

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return channels;
}
