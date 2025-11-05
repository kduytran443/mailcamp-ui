import { useEffect, ReactNode, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useAuthStore } from '@/stores/useAuthStore';
import { AuthService } from '@/services/authService';

interface AppInitializerProps {
  children: ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await AuthService.getMe();
        setUser(res.data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
  }, [setUser, logout]);

  if (loading) {
    // show a full-page spinner while loading user
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
