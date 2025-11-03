import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  Typography,
  LinearProgress,
  Stack,
  Button,
} from '@mui/material';
import { EnrolledClassDetails } from './EnrolledClassDetails';
import { EnrolledClass } from '@/models/EnrolledClass';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classIntroPath } from '@/utils/pathUtils';

interface Props {
  cls: EnrolledClass;
}

export const EnrolledClassCard = ({ cls }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Card>
      <Grid>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 70, borderRadius: 2 }}
          image={cls.thumbnailUrl}
          alt={cls.name}
        />
      </Grid>

      <Grid item xs sx={{ flex: 1 }}>
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="h6">{cls.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Giảng viên: {cls.instructor.name}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={cls.progress}
            sx={{ mt: 1, height: 6, borderRadius: 3 }}
          />
        </CardContent>
      </Grid>

      <Grid item>
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={1}>
          <Button
            variant="contained"
            size="small"
            color={cls.status === 'completed' ? 'success' : 'primary'}
            sx={{ minWidth: 120 }}
            onClick={() => navigate(classIntroPath(cls.id))}
          >
            {cls.status === 'completed' ? 'Completed' : 'Continue'}
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsExpanded((prev) => !prev)}
            sx={{ minWidth: 120 }}
          >
            {isExpanded ? 'Hide' : 'More'}
          </Button>
        </Stack>
      </Grid>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <EnrolledClassDetails cls={cls} />
      </Collapse>
    </Card>
  );
};
