import { Box, IconButton, useTheme, alpha } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Slider from 'react-slick';
import React, { useRef, useState } from 'react';

type CustomSliderProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  slidesToShow?: number;
  itemKey?: (item: T, index: number) => string;
};

function NextArrow({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.grey[200], 0.8);

  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 48,
        height: 48,
        position: 'absolute',
        top: '50%',
        right: -24,
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: bgColor,
        color: theme.palette.text.primary,
        boxShadow: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        ...(disabled && {
          opacity: 0.3,
          pointerEvents: 'none',
        }),
      }}
    >
      <ArrowForward fontSize="small" />
    </IconButton>
  );
}

function PrevArrow({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.grey[200], 0.8);

  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 48,
        height: 48,
        position: 'absolute',
        top: '50%',
        left: -24,
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: bgColor,
        color: theme.palette.text.primary,
        boxShadow: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        ...(disabled && {
          opacity: 0.3,
          pointerEvents: 'none',
        }),
      }}
    >
      <ArrowBack fontSize="small" />
    </IconButton>
  );
}

export default function CustomSlider<T>({
  items,
  renderItem,
  slidesToShow = 3,
  itemKey,
}: CustomSliderProps<T>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const totalSlides = items.length;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentSlide(current),
    nextArrow: (
      <NextArrow
        onClick={() => sliderRef.current?.slickNext()}
        disabled={currentSlide >= totalSlides - slidesToShow}
      />
    ),
    prevArrow: (
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} disabled={currentSlide <= 0} />
    ),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      {items.map((item, index) => (
        <Box key={itemKey?.(item, index) ?? index} p={1}>
          {renderItem(item)}
        </Box>
      ))}
    </Slider>
  );
}
