import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

export default function PasswordField({ value, onChange, error, helperText }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      size="small"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggle} edge="end" size="small">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
