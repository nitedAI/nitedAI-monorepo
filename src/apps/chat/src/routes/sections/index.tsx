import { getSession } from '@utils/getSession';
import { Navigate, useRoutes } from 'react-router-dom';

import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  const { workspaces } = getSession(['workspaces', 'user']);

  return useRoutes([
    {
      path: '/',
      element: <Navigate to={workspaces?.[0]?.path || '/login'} replace />,
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
