import { lazy } from 'react';
import { Navigate } from 'react-router-dom'; // 🛡️ Activation du système de protection et redirection sécurisée
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// Chargement dynamique des composants (Lazy Loading) pour optimiser les performances
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const EditLocalisation = Loadable(lazy(() => import('pages/edit-localisation')));
const NotificationsPage = Loadable(lazy(() => import('pages/notifications')));
const AjouteLocalisation = Loadable(lazy(() => import('pages/ajoute-localisation')));
const ViewProfile = Loadable(lazy(() => import('pages/view-profile')));
const EditProfile = Loadable(lazy(() => import('pages/edit-profile')));
const GestionCultures = Loadable(lazy(() => import('pages/crops/GestionCultures')));

// 🔐 Composant de sécurité (Protected Route)
// Vérifie la présence du Token JWT dans le LocalStorage avant d'autoriser l'accès
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// ⚙️ Configuration des routes protégées du Dashboard
const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ), // 🛡️ Le Layout est entièrement enveloppé pour sécuriser toutes les sous-routes d'un coup
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