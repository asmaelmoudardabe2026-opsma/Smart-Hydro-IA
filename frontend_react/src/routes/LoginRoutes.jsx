import { Navigate } from 'react-router-dom';
import MinimalLayout from 'layout/MinimalLayout';

// 🚀 SÉCURITÉ : Si la route login est appelée, elle redirige de force vers le Dashboard
const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'free/login',
      element: <Navigate to="/free/dashboard/default" replace />
    },
    {
      path: 'free/register',
      element: <Navigate to="/free/dashboard/default" replace />
    }
  ]
};

export default LoginRoutes;