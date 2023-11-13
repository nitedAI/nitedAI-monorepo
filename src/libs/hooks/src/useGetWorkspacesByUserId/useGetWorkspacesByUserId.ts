import { useGetAuthUser } from '../useGetAuthUser';
import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';

interface Workspace {
  id: string;
  title: string;
  image: string | null;
  info: number;
  path: string;
  disabled: boolean;
}

type Workspaces = Array<Workspace>;

/**
 * Custom hook to fetch and subscribe to workspaces by user ID.
 * @param {Workspaces} data - Initial state for the workspaces.
 * @returns {Workspaces} The current state of workspaces.
 */
export function useGetWorkspacesByUserId(data: Workspaces) {
  const userId = useGetAuthUser();
  const { data: workspaces }: { data: Workspaces } = useFetchSupabaseRealtimeFunction({
    name: 'get_workspaces_by_user_id',
    params: { user_uuid: userId },
    channel: 'realtime:public:workspaces',
    event: 'UPDATE',
  });

  return workspaces || data;
}
