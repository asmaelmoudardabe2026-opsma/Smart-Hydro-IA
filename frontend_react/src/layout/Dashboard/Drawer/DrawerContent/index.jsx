// src/layout/Dashboard/Drawer/DrawerContent/index.jsx
import SimpleBar from 'components/third-party/SimpleBar';
import Navigation from './Navigation';

export default function DrawerContent() {
  return (
    <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
      {/* Khllina ghir l-menu nqi, o l-card d pro t-7ydāt complètement hna */}
      <Navigation />
    </SimpleBar>
  );
}