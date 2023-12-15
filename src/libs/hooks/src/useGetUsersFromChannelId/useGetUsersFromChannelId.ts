import { useParams } from 'react-router-dom';

import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';

interface User {
  id: string;
  display: string;
}

type Users = Array<User>;

/**
 * Custom hook to fetch and subscribe to channels by workspace ID.
 * @param  channelId - The ID of the workspace to get channels for.
 * @returns List of users on current channel.
 */
export function useGetUsersFromChannelId(channelId?: string) {
  const { chat_id } = useParams();
  const chatId = channelId || chat_id;
  const { data }: { data: Users } = useFetchSupabaseRealtimeFunction({
    name: 'get_users_from_channel_id2',
    params: { channel_uuid: chatId },
  });

  return data || [];
}
