import { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography, Link, Alert } from '@mui/material';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'success'>('error');
  const [canSubmit, setCanSubmit] = useState(true);
  const [retryCountdown, setRetryCountdown] = useState<number>(0);

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

  const validateConfirmPassword = (value: string) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  };

  // Countdown for retry
  useEffect(() => {
    if (retryCountdown <= 0) return;
    const interval = setInterval(() => {
      setRetryCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [retryCountdown]);

  const handleSubmit = () => {
    if (!canSubmit) return;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(confirmPassword);

    setFormErrors({ email: emailError, password: passwordError, confirmPassword: confirmError });
    setAlertText(null);

    if (emailError || passwordError || confirmError) return;

    if (email === 'exist@example.com') {
      setAlertText('Email already exists');
      setAlertSeverity('error');
      return;
    }

    // Registration success
    setAlertText(
      'Registration successful! Please check your email to confirm. The confirmation link will expire in 5 minutes.',
    );
    setAlertSeverity('success');
    setCanSubmit(false);
    setRetryCountdown(30); // Retry allowed countdown
  };

  const handleRetry = () => {
    console.log('Resending confirmation email...');
    setRetryCountdown(30);
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
        {/* Header */}
        <Typography variant="h6" fontWeight={600} mb={1} textAlign="center">
          Welcome!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
          Please sign up to create your account
        </Typography>

        {/* Alerts */}
        {alertText && (
          <Stack spacing={1} sx={{ width: '100%', mb: 4 }}>
            <Alert severity={alertSeverity}>{alertText}</Alert>
            {retryCountdown > 0 && (
              <Typography variant="body2" color="text.secondary">
                Retry allowed in {retryCountdown}s
              </Typography>
            )}
            {retryCountdown <= 0 && alertSeverity === 'success' && (
              <Button variant="outlined" size="small" onClick={handleRetry}>
                Retry
              </Button>
            )}
          </Stack>
        )}

        {/* Fields */}
        <Stack spacing={1.5} sx={{ width: '100%' }}>
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
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
              setAlertText(null);
            }}
            error={!!formErrors.password}
            helperText={formErrors.password}
            size="small"
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setFormErrors((prev) => ({
                ...prev,
                confirmPassword: validateConfirmPassword(e.target.value),
              }));
              setAlertText(null);
            }}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            size="small"
            fullWidth
          />
        </Stack>

        {/* Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
          sx={{ py: 1.2, mt: 4, width: '100%' }}
        >
          Sign Up
        </Button>

        {/* Sign in link */}
        <Typography variant="body2" textAlign="center" sx={{ mt: 4 }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover" fontWeight={500}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
