import React from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemIcon,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationMenu from './NotificationMenu';
import { useNavigate } from 'react-router-dom';
import { UserDto } from '@/models/user.type';
import { api } from '@/api/axios';
import { useAuthStore } from '@/stores/useAuthStore';

interface CustomAccountMenuProps {
  user: UserDto | null;
}

export default function CustomAccountMenu({ user }: CustomAccountMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // call backend logout API to clear cookies
      await api.post('/auth/logout');

      // clear global state
      useAuthStore.getState().logout();

      // redirect to login
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <NotificationMenu />
      <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }}>
        <Avatar>{user?.name?.charAt(0)}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            width: 220,
            paddingY: 1,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={(e) => navigate('/profile')} sx={{ my: 1, px: 2 }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Profile</Typography>
        </MenuItem>

        <MenuItem sx={{ my: 1, px: 2 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Setting</Typography>
        </MenuItem>
        <MenuItem onClick={logout} sx={{ my: 1, px: 2 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="body2" color="error">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
