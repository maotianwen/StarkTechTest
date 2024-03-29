'use client';
import SideBar from '../components/side-bar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import StockData from '../components/stock-data';

export default function HomePage() {
  return (
    <Container sx={{ maxWidth: 1200 }}>
      <Grid container spacing={2} wrap="nowrap">
        <Grid item sx={{ minWidth: 260 }}>
          <SideBar />
        </Grid>
        <Grid item sm={12} lg={8}>
          <StockData />
        </Grid>
      </Grid>
    </Container>
  );
}
