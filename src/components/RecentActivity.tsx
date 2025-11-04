import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  Button,
  Paper,
} from '@mui/material';

type LogItem = {
  id: string;
  type?: 'email' | 'info' | 'warning' | 'member';
  message: string;
  detail?: string;
  time: string;
};

const sampleLogs: LogItem[] = [
  {
    id: '1',
    type: 'email',
    message: 'Campaign "Black Friday" sent',
    detail: 'Sent to 1,240 subscribers',
    time: '10 mins ago',
  },
  {
    id: '2',
    type: 'member',
    message: 'New member added',
    detail: 'john@example.com joined the workspace',
    time: '1 hour ago',
  },
  {
    id: '3',
    type: 'warning',
    message: 'Campaign delivery failed',
    detail: 'SMTP connection error',
    time: 'Yesterday',
  },
];

export default function RecentActivity({ logs = sampleLogs }: { logs?: LogItem[] }) {
  const iconOf = (type?: LogItem['type']) => {
    switch (type) {
      case 'member':
        return <PersonAddIcon fontSize="small" />;
      case 'warning':
        return <WarningAmberIcon fontSize="small" />;
      default:
        return <EmailIcon fontSize="small" />;
    }
  };

  const avatarColor = (type?: LogItem['type']) => {
    switch (type) {
      case 'member':
        return 'success.light';
      case 'warning':
        return 'warning.main';
      default:
        return 'primary.light';
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <List disablePadding>
        {logs.map((log, i) => (
          <React.Fragment key={log.id}>
            <ListItem
              alignItems="flex-start" /* important: align avatar+text top */
              sx={{
                py: 1.25,
                gap: 2,
                // ensure consistent min row height so columns look stable
                minHeight: 64,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: avatarColor(log.type),
                    width: 40,
                    height: 40,
                    color: 'common.white',
                  }}
                >
                  {iconOf(log.type)}
                </Avatar>
              </ListItemAvatar>

              {/* main content: primary + secondary */}
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {log.message}
                  </Typography>
                }
                secondary={
                  log.detail ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        // limit lines to 2 with ellipsis so rows remain similar height
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {log.detail}
                    </Typography>
                  ) : null
                }
                sx={{
                  // give text column flexible width; timestamp will be pushed to the right
                  mr: 2,
                }}
              />

              {/* timestamp: fixed to the top-right, no wrap */}
              <Box sx={{ ml: 'auto', textAlign: 'right', minWidth: 90 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  <AccessTimeIcon sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                  {log.time}
                </Typography>
              </Box>
            </ListItem>

            {i < logs.length - 1 && <Divider component="li" sx={{ my: 0.5 }} />}
          </React.Fragment>
        ))}
      </List>

      <Box mt={1}>
        <Button fullWidth size="small">
          View All Logs
        </Button>
      </Box>
    </Paper>
  );
}
