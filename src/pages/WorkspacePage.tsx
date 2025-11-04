import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Grid,
  Avatar,
  Paper,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Pagination,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SortIcon from '@mui/icons-material/Sort';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';
import dayjs from 'dayjs';
import React from 'react';
import RecentActivityLogs, { logs } from '@/components/RecentActivityLogs';

interface RecentActivity {
  id: string;
  type: 'email' | 'warning' | 'member';
  message: string;
  detail?: string;
  time: string;
}

export default function WorkspacePage() {
  // MOCK DATA -------------------------------------------------------
  const campaigns = [
    {
      id: '1',
      name: 'Welcome Series',
      subject: 'Welcome to our platform!',
      status: 'DRAFT',
      type: 'NEWSLETTER',
      schedule: null,
      createdAt: '2025-11-02',
      updatedAt: '2025-11-03',
    },
    {
      id: '2',
      name: 'Black Friday Promo',
      subject: '🔥 70% off everything!',
      status: 'SCHEDULED',
      type: 'PROMOTION',
      schedule: '2025-12-01T08:00:00Z',
      createdAt: '2025-10-29',
      updatedAt: '2025-11-01',
    },
    {
      id: '3',
      name: 'December Newsletter',
      subject: 'News and updates for December',
      status: 'SENT',
      type: 'NEWSLETTER',
      schedule: null,
      createdAt: '2025-10-10',
      updatedAt: '2025-10-20',
    },
  ];

  const members = [
    { name: 'Nguyễn Văn A', role: 'Owner', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Trần Thị B', role: 'Member', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Lê Văn C', role: 'Member', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);

  // ------------------------------------------------------------------

  return (
    <Container maxWidth={false} sx={{ width: '100%', px: 0, mt: 4, pb: 10 }} disableGutters>
      {/* HEADER ------------------------------------------------------ */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          alignItems: 'center',
        }}
      >
        <Button variant="contained">Create Campaign</Button>
      </Box>

      <Grid container spacing={3}>
        {/* LEFT CONTENT (campaigns) -------------------------------- */}
        <Grid item xs={12} md={9}>
          {/* Sort + pagination header */}
          <Box sx={{ mb: 2 }}>
            {/* Row 1 (Campaigns + Sort + maybe Pagination on desktop) */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexWrap: { xs: 'nowrap', md: 'nowrap' },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Campaigns
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                {/* Sort */}
                <Button
                  sx={{ minWidth: 120 }}
                  variant="outlined"
                  startIcon={<SortIcon />}
                  onClick={(e) => setSortAnchor(e.currentTarget)}
                >
                  Sort
                </Button>
                <Menu
                  anchorEl={sortAnchor}
                  open={Boolean(sortAnchor)}
                  onClose={() => setSortAnchor(null)}
                  MenuListProps={{
                    sx: { minWidth: 120 },
                  }}
                >
                  <MenuItem>Newest</MenuItem>
                  <MenuItem>Oldest</MenuItem>
                  <MenuItem>A → Z</MenuItem>
                  <MenuItem>Z → A</MenuItem>
                </Menu>

                {/* Pagination – only show in row on desktop */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Pagination count={3} shape="rounded" />
                </Box>
              </Stack>
            </Stack>

            {/* Row 2: Pagination full width (mobile only) */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Pagination count={3} shape="rounded" />
            </Box>
          </Box>

          {/* Campaign list */}
          <Stack spacing={2}>
            {campaigns.map((c) => (
              <Card
                key={c.id}
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  transition: '0.25s',
                  ':hover': { boxShadow: 4, borderColor: 'transparent' },
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography fontWeight={700}>{c.name}</Typography>

                    <Typography variant="body2" color="text.secondary">
                      Subject: {c.subject || 'No subject'}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Chip
                        label={c.status}
                        color={
                          c.status === 'SENT'
                            ? 'success'
                            : c.status === 'SCHEDULED'
                              ? 'warning'
                              : 'default'
                        }
                        size="small"
                      />

                      <Chip label={c.type} variant="outlined" size="small" />

                      {c.schedule && (
                        <Chip
                          label={`Scheduled: ${dayjs(c.schedule).format('MMM D, YYYY HH:mm')}`}
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      )}
                    </Stack>

                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                      Updated {dayjs(c.updatedAt).date()} • Created{' '}
                      {dayjs(c.createdAt).format('MMM D, YYYY')}
                    </Typography>
                  </Box>

                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* MEMBERS SIDEBAR ------------------------------------------ */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              position: 'sticky',
              top: 100,
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Members
            </Typography>

            <Stack spacing={2}>
              {members.map((m, i) => (
                <Stack direction="row" spacing={2} alignItems="center" key={i}>
                  <Avatar src={m.avatar} />
                  <Box>
                    <Typography fontWeight={600}>{m.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {m.role}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Manage Members
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 3, my: 6 }} />
      {/* RECENT ACTIVITY ----------------------------------------- */}
      <RecentActivityLogs logs={logs} />
    </Container>
  );
}
