import { EnrolledClassDetails } from '@/models/EnrolledClassDetails';
import { Avatar, Box, Rating, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

interface Props {
  classData: EnrolledClassDetails;
}

export default function ClassIntroHeader({ classData }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={3} alignItems="flex-start">
      <Box
        component="img"
        src={classData.thumbnailUrl}
        alt={classData.name}
        sx={{
          width: isSmallScreen ? '100%' : 360,
          height: isSmallScreen ? 'auto' : 220,
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />

      <Box flex={1}>
        <Typography variant="h5" fontWeight={600}>
          {classData.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Avatar
            alt={classData.instructor.name}
            src={classData.instructor.avatarUrl}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2" color="text.secondary">
            Giảng viên: {classData.instructor.name}
          </Typography>
        </Stack>

        <Typography variant="body2" mt={1}>
          {classData.numberOfLessons} bài học · {classData.totalStudents} học viên
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Rating
            name="read-only"
            value={classData.reviewRating}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            {classData.reviewRating}/5
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
