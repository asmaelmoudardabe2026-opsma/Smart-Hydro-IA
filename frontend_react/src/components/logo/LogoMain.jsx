// src/components/logo/LogoMain.jsx
import { useTheme } from '@mui/material/styles';

const LogoMain = () => {
  const theme = useTheme();
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2.5C12 2.5 19 8.5 19 13.5C19 17.37 15.87 20.5 12 20.5C8.13 20.5 5 17.37 5 13.5C5 8.5 12 2.5 12 2.5Z" 
        fill="url(#sidebarWaterGrad)" 
      />
      <path d="M12 17.5V11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 11C12 11 14 9 14 7C14 5 12 5 12 5C12 5 10 5 10 7C10 9 12 11 12 11Z" fill="#ffffff" />
      <path d="M12.5 13C12.5 13 15.5 12.5 16 10.5C16.5 8.5 15 7.5 15 7.5C15 7.5 13.5 8.5 13 10.5C12.5 12.5 12.5 13 12.5 13Z" fill="#ffffff" />
      <path d="M11.5 13C11.5 13 8.5 12.5 8 10.5C7.5 8.5 9 7.5 9 7.5C9 7.5 10.5 8.5 11 10.5C11.5 12.5 11.5 13 11.5 13Z" fill="#ffffff" />
      <defs>
        <linearGradient id="sidebarWaterGrad" x1="12" y1="2.5" x2="12" y2="20.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0288d1" />
          <stop offset="100%" stopColor="#26a69a" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoMain;