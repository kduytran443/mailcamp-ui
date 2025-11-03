import { Box, Tabs, Tab, Typography, Paper, Avatar, Stack, Container } from '@mui/material';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DashboardLayoutBasic from '@/layout/DashboardLayoutBasic';

const tabItems = [
  { label: 'Tổng quan', path: '' },
  { label: 'Bài học', path: 'lessons' },
  { label: 'Bài tập', path: 'assignments' },
  { label: 'Điểm', path: 'grades' },
  { label: 'Thành viên', path: 'members' },
  { label: 'Lịch học', path: 'schedule' },
];

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Determine current tab index
  const currentTab = tabItems.findIndex((tab) => location.pathname.endsWith(tab.path));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const newPath = `/class/${id}/${tabItems[newValue].path}`;
    navigate(newPath);
  };

  return (
    <DashboardLayoutBasic>
      <Container maxWidth={false} sx={{ py: 3 }}>
        {/* Header Banner */}
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            height: 200,
            mb: 2,
            backgroundImage: 'url(https://gstatic.com/classroom/themes/img_graduation.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Overlay background gradient nếu muốn đậm chữ hơn */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />

          {/* Nội dung nằm đè lên ảnh */}
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
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src="https://img-c.udemycdn.com/user/200_H/31334738_a13c_3.jpg"
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Lập trình Web Fullstack
                </Typography>
                <Typography variant="body1">GV: Nguyễn Văn A</Typography>
              </Box>
            </Stack>
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
