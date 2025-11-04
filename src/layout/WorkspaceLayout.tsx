import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Avatar,
  Stack,
  Container,
  CircularProgress,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DashboardLayoutBasic from '@/layout/DashboardLayoutBasic';
import { useEffect, useState } from 'react';
import { Workspace } from '@/models/workspace.types';
import { api } from '@/api/axios';

// Tab items tiếng Anh
const tabItems = [
  { label: 'Overview', path: '' },
  { label: 'Campaigns', path: 'campaigns' },
  { label: 'Members', path: 'members' },
  { label: 'Send Schedule', path: 'schedule' },
  { label: 'Activity Logs', path: 'logs' },
];

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch workspace details
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const { data } = await api.get(`/workspaces/${id}`);
        setWorkspace(data);
      } catch (err) {
        console.error('Failed to fetch workspace', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspace();
  }, [id]);

  // Determine current tab index
  const currentTab = tabItems.findIndex((tab) => location.pathname.endsWith(tab.path));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const newPath = `/workspaces/${id}/${tabItems[newValue].path}`;
    navigate(newPath);
  };

  // Default values
  const workspaceName = workspace?.name || 'Workspace Name';
  const workspaceOwner = 'Owner Name'; // giả sử API chưa trả owner
  const workspaceImage = workspace?.image || 'https://picsum.photos/1900/400?random=3';
  const workspaceAvatar = workspace?.image || 'https://picsum.photos/64/64?random=4';

  return (
    <DashboardLayoutBasic>
      <Container maxWidth={false}>
        {/* Header Banner */}
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            height: 200,
            mb: 2,
            backgroundImage: `url(${workspaceImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              px: 3,
            }}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={workspaceAvatar} sx={{ width: 64, height: 64 }} />
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {workspaceName}
                  </Typography>
                  <Typography variant="body1">Owner: {workspaceOwner}</Typography>
                </Box>
              </Stack>
            )}
          </Box>
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            value={currentTab === -1 ? 0 : currentTab}
            onChange={handleTabChange}
          >
            {tabItems.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        {/* Page content */}
        <Box mt={3}>{children}</Box>
      </Container>
    </DashboardLayoutBasic>
  );
}
