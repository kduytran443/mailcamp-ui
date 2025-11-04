import * as React from 'react';
import { createTheme, useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Box, IconButton, Typography } from '@mui/material';
import { useAuth, UserDTO } from '@/hooks/useAuth';
import { AuthStatus } from '@/enumeration/authStatus';
import LoginIcon from '@mui/icons-material/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomAccountMenu from '@/components/CustomAccountMenu';
import { useAuthStore } from '@/stores/useAuthStore';

const normalNavigation: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'about',
    title: 'About',
    icon: <LayersIcon />,
  },
];

const authNavigation: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const unauthNavigation: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Login',
    segment: 'login',
    icon: <LoginIcon />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // tablet
      md: 900, // desktop small
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 200,
        },
      },
    },
  },
});

export function useRealRouter(): Router {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => navigate(String(path)),
  };
}

interface DashboardLayoutBasicProps {
  children: React.ReactNode;
}

export default function DashboardLayoutBasic({ children }: DashboardLayoutBasicProps) {
  const router = useRealRouter();
  const { user, status } = useAuthStore();

  let navigationList: Navigation = normalNavigation;

  if (status === AuthStatus.AUTHENTICATED) {
    navigationList = authNavigation;
  } else if (status === AuthStatus.UNAUTHENTICATED) {
    navigationList = unauthNavigation;
  }

  return (
    <AppProvider
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: '',
        homeUrl: '/toolpad/core/introduction',
      }}
      navigation={navigationList}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => {
            if (status === AuthStatus.UNAUTHENTICATED) {
              return null;
            }
            return <CustomAccountMenu user={user} />;
          },
        }}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            bgcolor: theme.palette.mode === 'light' ? '#F6F8FB' : '#121212',
            p: 3,
          })}
        >
          {/* PAGE CONTENT */}
          <Box sx={{ flex: 1 }}>{children}</Box>

          {/* FOOTER */}
          <Box
            sx={{
              mt: 8,
              py: 2,
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: 14,
              borderTop: '1px solid #d0d0d0',
            }}
          >
            © {new Date().getFullYear()} Mail Camp — Built by Hudson
          </Box>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
