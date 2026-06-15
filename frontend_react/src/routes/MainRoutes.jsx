import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Votre composant de carte interactif stable
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// --- SIMULATIONS DES PAGES POUR LA PRÉSENTATION ---

const NotificationPage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <MainCard title="🔔 Centre de Notifications - Alertes Hydro-IA">
        <Typography variant="h5" color="error" sx={{ mb: 2, fontWeight: 'bold' }}>⚠️ Alerte Stress Hydrique - Secteur Zone A</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Le modèle prédictif a détecté une baisse anormale de l'humidité du sol combinée à une forte évapotranspiration sur la région de Marrakech. Une irrigation immédiate est recommandée pour les cultures de blé.
        </Typography>
        <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: '8px', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>ℹ️ Rapport Système</Typography>
          <Typography variant="body2">Dernière synchronisation des données satellites : Il y a 5 minutes.</Typography>
        </Box>
      </MainCard>
    </Grid>
  </Grid>
);

const GestionCulturesPage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <MainCard title="🌾 Suivi et Gestion des Cultures">
        <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>Parcelles Enregistrées</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Retrouvez ici la liste des cultures associées aux coordonnées géographiques de votre exploitation.
        </Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px' }}>Parcelle</th>
              <th style={{ padding: '12px' }}>Type de Culture</th>
              <th style={{ padding: '12px' }}>Statut IA</th>
              <th style={{ padding: '12px' }}>Besoin en Eau</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>Zone Nord - Marrakech</td>
              <td style={{ padding: '12px' }}>Olivier</td>
              <td style={{ padding: '12px', color: 'green', fontWeight: 'bold' }}>Optimal</td>
              <td style={{ padding: '12px' }}>Faible (0.5 L/m²)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>Zone Sud - Al Haouz</td>
              <td style={{ padding: '12px' }}>Cultures Maraîchères</td>
              <td style={{ padding: '12px', color: 'orange', fontWeight: 'bold' }}>Vigilance</td>
              <td style={{ padding: '12px' }}>Modéré (2.1 L/m²)</td>
            </tr>
          </tbody>
        </table>
      </MainCard>
    </Grid>
  </Grid>
);

const ViewProfilePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <MainCard title="👤 Profil Utilisateur">
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Box sx={{ width: 100, height: 100, bgcolor: '#1890ff', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px' }}>
            A
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Administrateur Smart-Hydro</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Rôle : Développeur & Gestionnaire Agricole</Typography>
        </Box>
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <MainCard title="🔑 Informations de Compte">
        <Typography variant="body1" sx={{ my: 1 }}><strong>Email :</strong> admin@smarthydro.com</Typography>
        <Typography variant="body1" sx={{ my: 1 }}><strong>Organisation :</strong> Université Privée de Marrakech (UPM)</Typography>
        <Typography variant="body1" sx={{ my: 1 }}><strong>Statut de l'application :</strong> Connecté en mode Démo PFE</Typography>
      </MainCard>
    </Grid>
  </Grid>
);

const EditProfilePage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <MainCard title="⚙️ Modifier le Profil">
        <Typography variant="body1" sx={{ mb: 3 }}>
          Formulaire de mise à jour des paramètres de sécurité de l'application et des clés d'API IA.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
          <label><strong>Nom complet :</strong></label>
          <input type="text" defaultValue="Administrateur Smart-Hydro" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          <label><strong>Adresse e-mail :</strong></label>
          <input type="email" defaultValue="admin@smarthydro.com" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          <button style={{ padding: '12px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Sauvegarder les modifications
          </button>
        </Box>
      </MainCard>
    </Grid>
  </Grid>
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/free',
  element: <Dashboard />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'edit-localisation',
      element: <DashboardDefault /> // L'onglet Edit Localisation garde l'accès complet à votre carte
    },
    {
      path: 'notification',
      element: <NotificationPage /> // Affiche le centre de notifications
    },
    {
      path: 'gestion-cultures',
      element: <GestionCulturesPage /> // Affiche le tableau des cultures
    },
    {
      path: 'view-profile',
      element: <ViewProfilePage /> // Affiche la fiche de profil
    },
    {
      path: 'edit-profile',
      element: <EditProfilePage /> // Affiche le formulaire de modification
    }
  ]
};

export default MainRoutes;