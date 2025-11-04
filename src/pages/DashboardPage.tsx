import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Stack,
  Grid,
  Avatar,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WorkspaceService } from '@/services/workspaceService';
import { PaginatedResult, Workspace } from '@/models/workspace.types';
import dayjs from 'dayjs';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State for modal
  const [openModal, setOpenModal] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');

  // Fetch workspaces
  const { data, isLoading } = useQuery<PaginatedResult<Workspace>, Error>({
    queryKey: ['workspaces'],
    queryFn: () => WorkspaceService.getMyWorkspaces(),
  });

  // Default empty array if undefined
  const workspaces: Workspace[] = data?.items || [];

  // Mutation to create workspace
  const createWorkspaceMutation = useMutation<
    Workspace, // result
    Error, // error
    { name: string; description?: string } // variables
  >({
    mutationFn: (payload) => WorkspaceService.createWorkspace(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      setOpenModal(false);
      setWorkspaceName('');
      setWorkspaceDescription('');
    },
  });

  // Chart data for Campaign Overview
  const chartData = {
    labels: workspaces.map((w) => w.name),
    datasets: [
      {
        label: 'Campaigns',
        data: workspaces.map((w) => 120),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const totalCampaigns = workspaces.reduce((sum, w) => sum + 12, 0);
  const totalMembers = workspaces.reduce((sum, w) => sum + 13, 0);

  return (
    <Box>
      {/* Page title + Create workspace button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        rowGap={2}
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ mt: { xs: 2, sm: 0 } }} // trên mobile cách ra chút
        >
          Create Workspace
        </Button>
      </Box>
      {/* Top row: Quick Stats + Campaign Overview */}
      <Grid container spacing={2} mb={4}>
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <Card
                sx={(theme) => ({ height: 120, backgroundColor: theme.palette.background.paper })}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2">Total Campaigns</Typography>
                  <Typography variant="h6">{totalCampaigns}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} md={12}>
              <Card
                sx={(theme) => ({ height: 120, backgroundColor: theme.palette.background.paper })}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2">Total Members</Typography>
                  <Typography variant="h6">{totalMembers}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Campaign Overview */}
        <Grid item xs={12} md={8}>
          <Card
            sx={(theme) => ({
              height: 250,
              p: 2,
              backgroundColor: theme.palette.background.paper,
            })}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Campaign Overview
            </Typography>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Card>
        </Grid>
      </Grid>

      {/* Workspaces Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Your Workspaces
      </Typography>

      <Grid container spacing={2}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ height: 180, backgroundColor: '#fff' }} />
              </Grid>
            ))
          : workspaces.map((ws) => (
              <Grid item xs={12} sm={6} md={4} key={ws.id}>
                <Card
                  onClick={(e) => navigate(`/workspaces/${ws.id}`)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: '0.2s',
                    '&:hover': { transform: 'scale(1.03)' },
                  }}
                >
                  {ws.image ? (
                    <CardMedia
                      component="img"
                      image={ws.image}
                      alt={ws.name}
                      sx={{ height: 140, objectFit: 'cover', width: '100%' }}
                    />
                  ) : (
                    <Box
                      height={140}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={(theme) => ({
                        bgcolor:
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                      })}
                    >
                      <WorkspacePremiumIcon sx={{ fontSize: 60 }} />
                    </Box>
                  )}
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                        <WorkspacePremiumIcon />
                      </Avatar>
                      <Typography variant="h6">{ws.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {ws.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Created: {dayjs(ws.createdAt).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                      Updated: {dayjs(ws.updatedAt).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                    <Box display="flex" gap={2} mt={1}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <CampaignIcon fontSize="small" />
                        <Typography variant="body2">{12} campaigns</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <PeopleIcon fontSize="small" />
                        <Typography variant="body2">{15} members</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Modal for creating workspace */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 600,
            width: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Create Workspace
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Workspace Name"
              value={workspaceName}
              required
              onChange={(e) => setWorkspaceName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
              fullWidth
              required
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              onClick={() =>
                createWorkspaceMutation.mutate({
                  name: workspaceName,
                  description: workspaceDescription,
                })
              }
              disabled={!workspaceName}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
