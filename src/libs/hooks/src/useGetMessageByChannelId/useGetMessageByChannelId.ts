import { useEffect } from 'react';
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

export function useGetMessageByChannelId(page: number = 1) {
  const { chat_id: channelId } = useParams();
  const params = channelId ?
    {
    name: 'get_messages_by_channel_id',
    params: { channel_uuid: channelId, page },
    channel: `realtime:public:messages`,
    } :
    {};

  const { data: messages, refetch }: { data: Channels; refetch: () => void } = useFetchSupabaseRealtimeFunction(params);

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return messages;
}
