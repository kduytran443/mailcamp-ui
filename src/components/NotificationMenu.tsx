import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Mock notification data
const mockNotifications = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Thông báo #${i + 1}`,
  content: `Nội dung chi tiết thông báo số ${i + 1}`,
}));

const PAGE_SIZE = 5;

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<number>(PAGE_SIZE);
  const [loading, setLoading] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setVisibleItems(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => prev + PAGE_SIZE);
      setLoading(false);
    }, 1000); // Giả lập API call
  };

  const unreadCount = 17;

  return (
    <>
      <IconButton size="large" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ color: 'primary.main' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            mt: 1.5,
          },
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Thông báo
          </Typography>
        </Box>

        <Divider />

        {mockNotifications.slice(0, visibleItems).map((item) => (
          <MenuItem key={item.id} sx={{ alignItems: 'start', whiteSpace: 'normal' }}>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.content}
              </Typography>
            </Box>
          </MenuItem>
        ))}

        {visibleItems < mockNotifications.length && (
          <MenuItem disabled={loading} onClick={handleLoadMore} sx={{ justifyContent: 'center' }}>
            {loading ? <CircularProgress size={20} /> : 'Tải thêm'}
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
