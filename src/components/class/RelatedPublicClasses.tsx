import { Box, Card, CardContent, Typography, CardMedia } from '@mui/material';
import CustomSlider from '@/components/CustomSlider';
import { useNavigate } from 'react-router-dom';
import { classIntroPath } from '@/utils/pathUtils';

const dummyClasses = [
  {
    id: '1',
    title: 'Lập trình Web cơ bản Spring Boot cho người mới Spring Boot cho người mới',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc:
      'Tìm hiểu HTML, CSS và JavaScript. Tìm hiểu HTML, CSS và JavaScript Tìm hiểu HTML, CSS và JavaScript',
  },
  {
    id: '2',
    title: 'ReactJS nâng cao',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc: 'Hooks, Redux, và tối ưu hóa hiệu suất.',
  },
  {
    id: '3',
    title: 'Spring Boot cho người mới',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc: 'API RESTful, cấu trúc project, JPA.',
  },
  {
    id: '3',
    title: 'Spring Boot cho người mới',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc: 'API RESTful, cấu trúc project, JPA.',
  },
  {
    id: '3',
    title: 'Spring Boot cho người mới',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc: 'API RESTful, cấu trúc project, JPA.',
  },
  {
    id: '3',
    title: 'Spring Boot cho người mới Spring Boot cho người mới Spring Boot cho người mới',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc: 'API RESTful, cấu trúc project, JPA.',
  },
  {
    id: '3',
    title: 'Spring Boot cho người mới',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiby9e7qy4vKIfBjKIybASUs5wUSne-VloayYrurUm9kp5v742cnLnEhDht-ptiG4WBefRBRVPAGM7zYD2PnyBagoQxOmAhKML-GxRZ59Um9CQzbYNEtS2GdODshc-QF0PrhhXQaE6GoaI/w1200-h630-p-k-no-nu/0-QmxDMtQShSHGzC6v.jpg',
    shortDesc: 'API RESTful, cấu trúc project, JPA.',
  },
];

export default function RelatedPublicClasses() {
  const navigate = useNavigate();

  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        Lớp học liên quan
      </Typography>

      <CustomSlider
        items={dummyClasses}
        slidesToShow={4}
        itemKey={(cls) => cls.id}
        renderItem={(cls) => (
          <Card
            onClick={() => navigate(classIntroPath(cls.id))}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.01)',
                boxShadow: 4,
              },
            }}
          >
            <CardMedia component="img" height="140" image={cls.image} alt={cls.title} />
            <CardContent>
              <Typography
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.4,
                  minHeight: '2.8em',
                }}
                variant="subtitle1"
                fontWeight={600}
              >
                {cls.title}
              </Typography>
              <Typography
                sx={{
                  marginTop: '1em',
                  display: '-webkit-box',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 3,
                  fontSize: '0.7rem',
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.4,
                  minHeight: '4.2em',
                }}
                variant="body2"
                color="text.secondary"
              >
                {cls.shortDesc}
              </Typography>
            </CardContent>
          </Card>
        )}
      />
    </Box>
  );
}
