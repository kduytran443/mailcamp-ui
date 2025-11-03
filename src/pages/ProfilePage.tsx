'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Snackbar,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { UserDTO } from '@/hooks/useAuth';

// Mock user data - TODO: Replace with real API call
const mockUser = {
  id: '01234567-89ab-cdef-0123-456789abcdef',
  username: 'johndoe',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: '/professional-avatar.png',
  oauthId: 'google_123456789', // null if not OAuth user
  roles: ['USER', 'ADMIN'],
};

const axiosAuthClient = axios.create({
  baseURL: 'http://localhost:8072/auth-management/api',
  withCredentials: true,
});

export default function ProfilePage() {
  const [user, setUser] = useState<UserDTO>();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username,
    email: user?.username,
    name: user?.name,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosAuthClient.get<UserDTO>('/my-info');
        setUser(res.data);
      } catch (error) {
        console.error('Auth failed', error);
      }
    };
    fetchUser();
  }, []);

  // Password change dialog
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Notifications
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditData({
        username: user?.username,
        email: user?.name,
        name: user?.name,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // TODO: API call to update user profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editData)
      // })

      // Mock success
      setIsEditing(false);
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to update profile',
        severity: 'error',
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // TODO: Upload file to storage service
      // const formData = new FormData()
      // formData.append('avatar', file)
      // const response = await fetch('/api/user/avatar', {
      //   method: 'POST',
      //   body: formData
      // })

      // Mock success - create preview URL
      const previewUrl = URL.createObjectURL(file);
      setNotification({
        open: true,
        message: 'Avatar updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to upload avatar',
        severity: 'error',
      });
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        open: true,
        message: 'New passwords do not match',
        severity: 'error',
      });
      return;
    }

    try {
      // TODO: API call to change password
      // const response = await fetch('/api/user/change-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword
      //   })
      // })

      // Mock success
      setPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setNotification({
        open: true,
        message: 'Password changed successfully!',
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to change password',
        severity: 'error',
      });
    }
  };

  const isOAuthUser = true;

  return (
    <Box className="min-h-screen bg-background">
      <Box className="p-8">
        <Box className="mb-8">
          <Typography variant="h4" className="text-foreground mb-2 font-semibold">
            Profile
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            Manage your account settings and preferences.
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar & Basic Info */}
          <Box className="lg:col-span-1">
            <Card className="github-card">
              <CardContent className="p-6">
                {/* Avatar Section */}
                <Box className="flex flex-col items-center mb-6">
                  <Box className="relative mb-4">
                    <Avatar
                      src={user?.avatar}
                      sx={{ width: 120, height: 120 }}
                      className="border border-border"
                    />
                    <IconButton
                      component="label"
                      className="absolute -bottom-1 -right-1 bg-background border border-border hover:bg-muted"
                      size="small"
                    >
                      <PhotoCameraIcon fontSize="small" className="text-muted-foreground" />
                      <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} />
                    </IconButton>
                  </Box>

                  <Box className="text-center">
                    <Typography variant="h6" className="text-foreground mb-1 font-semibold">
                      {user?.name}
                    </Typography>
                    <Typography variant="body2" className="text-muted-foreground">
                      @{user?.username}
                    </Typography>
                  </Box>
                </Box>

                {/* Roles */}
                <Box className="mb-4">
                  <Typography variant="body2" className="text-foreground font-medium">
                    Roles
                  </Typography>
                  <Box className="mt-2 flex flex-wrap gap-2">
                    {user?.roles.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        size="small"
                        className="bg-secondary text-secondary-foreground text-xs"
                      />
                    ))}
                  </Box>
                </Box>

                {/* OAuth Status */}
                {isOAuthUser && (
                  <Box className="pt-4 border-t border-border">
                    <Box className="flex items-center gap-2">
                      <GoogleIcon fontSize="small" className="text-muted-foreground" />
                      <Typography variant="body2" className="text-muted-foreground">
                        Connected via Google
                      </Typography>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Profile Form */}
          <Box className="lg:col-span-2">
            <Card className="github-card">
              {/* Profile Information Header */}
              <Box className="p-6 border-b border-border">
                <Box className="flex items-center justify-between">
                  <Typography variant="h6" className="text-foreground font-semibold">
                    Profile Information
                  </Typography>
                  <Box className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleEditToggle}
                          variant="outlined"
                          size="small"
                          className="github-btn-secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          variant="contained"
                          size="small"
                          className="github-btn-primary"
                        >
                          Save changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleEditToggle}
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        className="github-btn-secondary"
                      >
                        Edit
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Form Fields */}
              <CardContent className="p-6">
                <Stack spacing={3}>
                  {/* User ID */}
                  <TextField
                    label="User ID"
                    value={user?.username ?? ''}
                    disabled
                    fullWidth
                    helperText="This is your unique identifier and cannot be changed."
                    className="github-input"
                  />

                  {/* Username */}
                  <TextField
                    label="Username"
                    value={isEditing ? editData.username : user?.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    disabled={!isEditing}
                    fullWidth
                    className="github-input"
                  />

                  {/* Full Name */}
                  <TextField
                    label="Full Name"
                    value={isEditing ? editData.name : user?.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    disabled={!isEditing}
                    fullWidth
                    className="github-input"
                  />

                  {/* Email */}
                  <TextField
                    label="Email"
                    type="email"
                    value={isEditing ? editData.email : user?.username}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    disabled={!isEditing}
                    fullWidth
                    className="github-input"
                  />
                </Stack>
              </CardContent>

              {/* Password Section */}
              {!isOAuthUser && (
                <Box className="border-t border-border p-6">
                  <Box className="flex items-center justify-between">
                    <Box>
                      <Typography variant="body2" className="text-foreground mb-1 font-medium">
                        Password
                      </Typography>
                      <Typography variant="caption" className="text-muted-foreground">
                        Change your account password
                      </Typography>
                    </Box>
                    <Button
                      onClick={() => setPasswordDialog(true)}
                      variant="outlined"
                      size="small"
                      startIcon={<LockIcon />}
                      className="github-btn-secondary"
                    >
                      Change password
                    </Button>
                  </Box>
                </Box>
              )}
            </Card>
          </Box>
        </Box>

        {/* Password Change Dialog - GitHub style */}
        <Dialog
          open={passwordDialog}
          onClose={() => setPasswordDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            className: 'github-card',
          }}
        >
          <DialogTitle className="text-foreground border-b border-border">
            Change Password
          </DialogTitle>
          <DialogContent className="pt-6">
            <Stack spacing={3}>
              <TextField
                label="Current Password"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                        }
                        size="small"
                      >
                        {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="New Password"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                        }
                        size="small"
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm New Password"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                        }
                        size="small"
                      >
                        {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions className="border-t border-border p-4">
            <Button
              onClick={() => setPasswordDialog(false)}
              variant="outlined"
              className="github-btn-secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordChange}
              variant="contained"
              className="github-btn-primary"
            >
              Change Password
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert
            severity={notification.severity}
            onClose={() => setNotification({ ...notification, open: false })}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
