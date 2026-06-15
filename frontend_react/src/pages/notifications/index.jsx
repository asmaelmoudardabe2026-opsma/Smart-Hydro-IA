import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// project imports
import MainCard from 'components/MainCard';

export default function NotificationPage() {
  // 1. إدارة قائمة الإشعارات محلياً
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'error',
      title: 'Alerte Stress Hydrique - Secteur Zone A',
      message: 'Le modèle prédictif a détecté une baisse anormale de l\'humidité du sol combinée à une forte évapotranspiration sur la région de Marrakech. Une irrigation immédiate est recommandée pour les cultures.'
    }
  ]);

  // 2. جلب الإشعارات الحقيقية من الـ Backend عند تحميل الصفحة (اختياري وحسب إعدادات السيرفر لديكِ)
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications'); // تأكدي من توافق المسار مع السيرفر
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setNotifications(data);
          }
        }
      } catch (error) {
        console.log("Note: Utilisation des notifications locales (le serveur n'a pas renvoyé de liste historique).");
      }
    };
    fetchNotifications();
  }, []);

  // 3. دالة حذف تنبيه معين عند الضغط على زر التسكير (X)
  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // 4. دالة المحاكاة الذكية المحدثة لتوليد سيناريوهات متنوعة تناسب العرض
  const simulerNouvelleAlerte = () => {
    // مصفوفة من السيناريوهات العشوائية لجعل العرض التقديمي مبهراً ومتحركاً
    const scenarios = [
      {
        type: 'warning',
        title: '⚠️ Nouvelle Alerte IA - Capteur Nord',
        message: 'Évapotranspiration critique détectée à Marrakech. Le système suggère d\'activer l\'irrigation automatisée dans 15 minutes.'
      },
      {
        type: 'info',
        title: '💧 Optimisation Éco - Ajustement Auto',
        message: 'Des précipitations légères sont prévues sur la zone d\'exploitation. Le volume d\'irrigation prédictif a été réduit de 20%.'
      },
      {
        type: 'success',
        title: '✅ Cycle d\'Irrigation Terminé',
        message: 'Le secteur Sud a reçu avec succès son quota de 35 m³/hectare. Les capteurs valident le retour à une humidité optimale.'
      }
    ];

    // اختيار عشوائي لسيناريو عند كل ضغطة زر
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    const nouvelleAlerte = {
      id: Date.now(), // معرف فريد
      ...randomScenario
    };

    // إضافة التنبيه الجديد في مقدمة القائمة
    setNotifications([nouvelleAlerte, ...notifications]);
  };

  // دالة مساعدة لتحديد خلفيات مخصصة وحواف مرنة لكل نوع إشعار
  const getAlertStyles = (type) => {
    switch (type) {
      case 'error':
        return { bg: '#fff1f0', border: '#ffccc7' };
      case 'warning':
        return { bg: '#fffbe6', border: '#ffe58f' };
      case 'info':
        return { bg: '#e6f7ff', border: '#91d5ff' };
      case 'success':
        return { bg: '#f6ffed', border: '#b7eb8f' };
      default:
        return { bg: '#ffffff', border: '#d9d9d9' };
    }
  };

  return (
    <Grid container spacing={3}>
      {/* الجزء العلوي: العنوان وزر المحاكاة التفاعلي */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Centre de Notifications - Alertes Hydro-IA
        </Typography>

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={simulerNouvelleAlerte}
          sx={{ fontWeight: 'bold', textTransform: 'none', borderRadius: '6px', boxShadow: 2 }}
        >
          Simuler une Alerte en Direct
        </Button>
      </Grid>

      {/* لوحة عرض التنبيهات الزاوية */}
      <Grid item xs={12}>
        <MainCard title={`Alertes Actives (${notifications.length})`}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                Aucune alerte active. Votre exploitation est parfaitement optimisée.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {notifications.map((notif) => {
                const styles = getAlertStyles(notif.type);
                return (
                  <Box key={notif.id} sx={{ position: 'relative' }}>
                    <Alert 
                      severity={notif.type} 
                      variant="outlined" 
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteNotification(notif.id)}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ 
                        borderRadius: '8px', 
                        p: 2,
                        backgroundColor: styles.bg,
                        borderColor: styles.border
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, pr: 2 }}>
                        {notif.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {notif.message}
                      </Typography>
                    </Alert>

                    {/* معلومات المزامنة لكل إشعار */}
                    <Box sx={{ mt: 1, px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1890ff' }} />
                      <Typography variant="caption" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                        Rapport Système — Traitement IA en temps réel
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
}