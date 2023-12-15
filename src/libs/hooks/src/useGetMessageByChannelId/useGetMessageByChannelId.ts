import { useEffect } from 'react';
import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';
import { useParams } from 'react-router-dom';

interface MessageTypes {
  id: string;
  content: string;
  created_at: string;
  user_name: string;
  is_bot: string;
}

export function useGetMessageByChannelId(page: number = 1): MessageTypes[] {
  const { chat_id: channelId } = useParams();
  const params = channelId ?
    {
    name: 'get_messages_by_channel_id',
    params: { channel_uuid: channelId, page },
    channel: `realtime:public:messages`,
    } :
    {};

  const { data: messages, refetch }: { data: MessageTypes[]; refetch: () => void } = useFetchSupabaseRealtimeFunction(params);

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return messages;
}
