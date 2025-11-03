import { Box, Grid, Typography } from '@mui/material';
import { EnrolledClass } from '@/models/EnrolledClass';

export const EnrolledClassDetails = ({ cls }: { cls: EnrolledClass }) => {
  return (
    <Box px={2} pb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">Ngày tham gia: {cls.joinedDate}</Typography>
          <Typography variant="body2">Sĩ số lớp: {cls.totalStudents} học viên</Typography>
          <Typography variant="body2">Đánh giá lớp: {cls.reviewRating} ★</Typography>
        </Grid>
        <Grid item xs={12} sm={6} display="flex" alignItems="center" gap={1}>
          {cls.instructor && (
            <img
              src={cls.instructor.avatarUrl}
              alt={cls.instructor.name}
              style={{ width: 48, height: 48, borderRadius: '50%' }}
            />
          )}
          <Typography variant="body2">{cls.instructor.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
