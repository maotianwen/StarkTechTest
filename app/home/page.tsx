'use client';
import SideBar from '../components/side-bar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import StockData from '../components/stock-data';
import Header from '@/app/components/header';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function HomePage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Header />
      <Container sx={{ minWidth: 1200, paddingBottom: '30px' }}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item sx={{ minWidth: 260 }}>
            <SideBar />
          </Grid>
          <Grid item sm={12} lg={8}>
            <StockData />
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}
