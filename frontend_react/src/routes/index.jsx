import { createBrowserRouter, Navigate } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/free/dashboard/default" replace />
  },
  {
    path: '/free',
    element: <Navigate to="/free/dashboard/default" replace />
  },
  {
    path: '/free/login',
    element: <Navigate to="/free/dashboard/default" replace />
  },
  MainRoutes
]);

export default router;