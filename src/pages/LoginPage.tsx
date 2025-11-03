import PasswordField from '@/components/PasswordField';
import { AuthService } from '@/services/authService';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '@/models/user.type';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'success'>('error');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email is invalid';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setFormErrors({ email: emailError, password: passwordError });
      setAlertText('Please fix the errors bellow.');
      setAlertSeverity('error');
      return;
    }

    try {
      const res = await AuthService.login({ email, password });
      // decode JWT to get user info
      const payload: UserDto = jwtDecode(res.accessToken);
      setUser(payload); // set global state
      setAlertText('Login successful!');
      setAlertSeverity('success');

      navigate('/dashboard'); // redirect after login
    } catch (err: any) {
      setAlertText(err.response?.data?.message || 'Login failed');
      setAlertSeverity('error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1} textAlign="center">
          Welcome!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
          Please sign in to continue
        </Typography>

        <Stack spacing={2} sx={{ width: '100%' }}>
          {alertText && (
            <Alert severity={alertSeverity} sx={{ width: '100%' }}>
              {alertText}
            </Alert>
          )}

          <TextField
            label="Email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              setAlertText(null);
            }}
            error={!!formErrors.email}
            helperText={formErrors.email}
            size="small"
            fullWidth
          />

          <PasswordField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors((prev) => ({
                ...prev,
                password: validatePassword(e.target.value),
              }));
              setAlertText(null);
            }}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ py: 1.2, mt: 3, width: '100%' }}
          >
            Login
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <Link href="/sign-up" underline="hover" fontWeight={500}>
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
