import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
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
import { WorkspaceDto, workspacesMock } from '@/models/workspace.type';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<WorkspaceDto[]>([]);

  useEffect(() => {
    setWorkspaces(workspacesMock);
  }, []);

  // Chart placeholder
  const chartData = {
    labels: workspaces.map((w) => w.name),
    datasets: [
      {
        label: 'Campaigns',
        data: workspaces.map((w) => w.campaignsCount || 0),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const navigate = useNavigate();
  const totalCampaigns = workspaces.reduce((sum, w) => sum + (w.campaignsCount ?? 0), 0);
  const totalMembers = workspaces.reduce((sum, w) => sum + (w.membersCount ?? 0), 0);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      {/* Top row: Quick Stats + Campaign Overview */}
      <Grid container spacing={2} mb={4}>
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <Card sx={{ height: 120, backgroundColor: '#fff' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2">Total Campaigns</Typography>
                  <Typography variant="h6">{totalCampaigns}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={12}>
              <Card sx={{ height: 120, backgroundColor: '#fff' }}>
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
          <Card sx={{ height: 250, p: 2, backgroundColor: '#fff' }}>
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
        {workspaces.map((ws) => (
          <Grid item xs={12} sm={6} md={4} key={ws.id}>
            <Card
              sx={{ cursor: 'pointer', backgroundColor: '#fff' }}
              onClick={() => navigate(`/workspace/${ws.id}`)}
            >
              <CardMedia component="img" height="140" image={ws.imageUrl} alt={ws.name} />
              <CardContent>
                <Typography variant="h6">{ws.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {ws.campaignsCount} campaigns | {ws.membersCount} members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
