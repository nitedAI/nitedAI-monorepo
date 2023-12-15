import { useGetAuthUser } from '../useGetAuthUser';
import { useFetchSupabaseRealtimeFunction } from '../useFetchSupabaseRealtimeFunction';
import { NavItemBaseProps } from '@ts/Nav';

type Workspaces = Array<NavItemBaseProps>;

/**
 * Custom hook to fetch and subscribe to workspaces by user ID.
 * @param data - Initial state for the workspaces.
 * @returns The current state of workspaces.
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
