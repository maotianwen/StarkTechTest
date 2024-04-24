import SideBar from '../components/side-bar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import StockData from '../components/stock-data';
import Header from '@/app/components/header';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getTaiwanStockInfo } from '../lib/fetch';
import type { StockInfoType, ArrayElementType } from '../lib/definitions';

export default async function HomePage() {
  const opt = await getTaiwanStockInfo({});
  let options: (ArrayElementType<StockInfoType['data']> & { index: number })[] = [];
  if (opt.status === 200) {
    options = opt.data.map((item, index) => ({ ...item, index }));
  }
  return (
    <Suspense fallback={<CircularProgress />}>
      <Header options={options} />
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
