import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const EditLocalisation = Loadable(lazy(() => import('pages/edit-localisation')));
const NotificationsPage = Loadable(lazy(() => import('pages/notifications')));
const AjouteLocalisation = Loadable(lazy(() => import('pages/ajoute-localisation')));
const ViewProfile = Loadable(lazy(() => import('pages/view-profile')));
const EditProfile = Loadable(lazy(() => import('pages/edit-profile')));


const GestionCultures = Loadable(lazy(() => import('pages/crops/GestionCultures')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    { path: '/', element: <DashboardDefault /> },
    { path: 'dashboard', children: [{ path: 'default', element: <DashboardDefault /> }] },
    { path: 'edit-localisation', element: <EditLocalisation /> },
    { path: 'notifications', element: <NotificationsPage /> },
    { path: 'ajoute-localisation', element: <AjouteLocalisation /> },
    { path: 'view-profile', element: <ViewProfile /> },
    { path: 'edit-profile', element: <EditProfile /> },
    { path: 'gestion-cultures', element: <GestionCultures /> }
  ]
};

export default MainRoutes;