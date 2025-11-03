import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";

interface ResponsiveGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function ResponsiveGrid<T>({items, renderItem}: ResponsiveGridProps<T>) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items.map((item, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
            {renderItem(item, index)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
