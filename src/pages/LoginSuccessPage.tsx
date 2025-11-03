import { useNavigate } from 'react-router-dom';
import { Dialog, CircularProgress, Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import loginSuccessAnimation from '@/assets/gif/loginSuccessAnimation.json';
import { useAuth } from '@/hooks/useAuth';
import { AuthStatus } from '@/enumeration/authStatus';

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const { status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.UNAUTHENTICATED) {
      navigate('/login');
    }

    if (status === AuthStatus.AUTHENTICATED) {
      const timeoutInstance = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

      return () => clearTimeout(timeoutInstance);
    }
  }, [status, navigate]);

  // PENDING state: show spinner
  if (status === AuthStatus.PENDING) {
    return (
      <Dialog
        open={true}
        PaperProps={{ sx: { borderRadius: 4, p: 4, minWidth: 320, textAlign: 'center' } }}
      >
        <CircularProgress />
        <Typography mt={2}>Checking login status...</Typography>
      </Dialog>
    );
  }

  if (status === AuthStatus.UNAUTHENTICATED) {
    return null;
  }

  return (
    <Dialog
      open={true}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 3,
          textAlign: 'center',
          minWidth: 320,
          maxWidth: 400,
          backgroundColor: (theme) => theme.palette.info.light,
          color: (theme) => theme.palette.success.contrastText,
        },
      }}
    >
      <Lottie animationData={loginSuccessAnimation} style={{ width: 180, margin: '0 auto' }} />

      <Typography variant="h5" fontWeight="bold" mt={2} color="text.secondary">
        Login Successful!
      </Typography>

      <Typography variant="body1" mt={1} color="text.secondary">
        You will be redirected shortly.
      </Typography>

      <Box mt={3}>
        <CircularProgress size={24} color="info" />
      </Box>
    </Dialog>
  );
}
