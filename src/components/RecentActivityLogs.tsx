import React from 'react';
import { Box, Paper, Typography, Divider, Button, Avatar, Grid } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Log {
  id: string;
  type: 'member' | 'warning' | 'email';
  content: string;
  time: string;
}

interface RecentActivityLogsProps {
  logs: Log[];
  onViewAll?: () => void;
}

export const logs: Log[] = [
  {
    id: '1',
    type: 'member',
    content: 'Nguyễn Văn A đã được thêm vào workspace',
    time: '2 giờ trước',
  },
  {
    id: '2',
    type: 'email',
    content: 'Campaign "Black Friday" đã được gửi tới 1500 người',
    time: '5 giờ trước',
  },
  {
    id: '3',
    type: 'warning',
    content: 'Campaign "Xmas Sale" bị lỗi gửi email',
    time: '1 ngày trước',
  },
  {
    id: '4',
    type: 'member',
    content: 'Trần Thị B đã rời workspace',
    time: '2 ngày trước',
  },
];

export default function RecentActivityLogs({ logs, onViewAll }: RecentActivityLogsProps) {
  const getIcon = (type: Log['type']) => {
    switch (type) {
      case 'member':
        return <PersonAddIcon fontSize="small" />;
      case 'warning':
        return <WarningAmberIcon fontSize="small" />;
      case 'email':
        return <EmailIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ width: '100%', p: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={3}>
        Recent Activities
      </Typography>

      <Grid container spacing={1} alignItems="center">
        {logs.map((log) => (
          <Grid container key={log.id} spacing={1} alignItems="center" sx={{ py: 1 }}>
            {/* Time column */}
            <Grid item xs={12} sm={2} display="flex" alignItems="center">
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" noWrap>
                {log.time}
              </Typography>
            </Grid>

            {/* Icon */}
            <Grid item xs={12} sm={1} display="flex" justifyContent="center">
              <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                {getIcon(log.type)}
              </Avatar>
            </Grid>

            {/* Content */}
            <Grid item xs={12} sm={9}>
              <Typography variant="body2">{log.content}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Button fullWidth size="small" onClick={onViewAll}>
        View All Logs
      </Button>
    </Paper>
  );
}
