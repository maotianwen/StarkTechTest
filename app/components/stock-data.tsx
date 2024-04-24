'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTaiwanStockMonthRevenue } from '@/app/lib/fetch';
import RevenueTable from './table';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useStore } from '@/app/store';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { StockMonthRevenueType } from '@/app/lib/definitions';
import Chart from './chart';
import { getDateNYearsAgo } from '@/app/lib/utils';
import Empty from './empty';

const StockData = () => {
  const searchParams = useSearchParams();
  const [range, setRange] = useState('4'); //因为要计算单月营收年增率，所以展示3年数据实际上需要请求近4年的数据

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(searchParams);
      const stockKey = params.get('id');
      if (stockKey) {
        const [id] = stockKey.split('_');
        setLoading(true);
        const res = await getTaiwanStockMonthRevenue({
          data_id: id,
          start_date: getDateNYearsAgo(parseInt(range)),
        });
        setLoading(false);
        if (res.status === 200) {
          setRevenueData(res.data);
        }
      } else {
        setRevenueData([]);
      }
    })();
  }, [searchParams, range]);

  const [revenueData, setRevenueData] = useState<StockMonthRevenueType['data']>();
  const filteredRevenueData = useMemo(() => revenueData?.slice(12), [revenueData]); //去掉前12个
  const [loading, setLoading] = useState(false);

  const stockTitle = useStore((state) => state.stockTitle);

  const handleRangeChange = (e: SelectChangeEvent) => {
    setRange(e.target.value);
  };

  const noData = !loading && !!revenueData && revenueData.length === 0;

  return (
    <div>
      <Empty visible={noData} />
      <Box sx={{ display: noData ? 'none' : 'block' }}>
        <Paper elevation={3}>
          <Box display="flex" alignItems="center" padding="16px" marginBottom="20px">
            {stockTitle}
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '20px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="20px"
          >
            <Button variant="contained" size="large">
              每月营收
            </Button>
            <FormControl variant="outlined">
              <Select
                size="small"
                variant="outlined"
                onChange={handleRangeChange}
                value={range}
              >
                <MenuItem value={'4'}>近3年</MenuItem>
                <MenuItem value={'6'}>近5年</MenuItem>
                <MenuItem value={'9'}>近8年</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Chart
            data={revenueData}
            filteredRevenueData={filteredRevenueData}
            loading={loading}
          />
        </Paper>
        <Paper elevation={3}>
          <Button
            variant="contained"
            size="large"
            sx={{
              margin: '16px',
            }}
          >
            详细数据
          </Button>
          <RevenueTable
            data={revenueData}
            filteredRevenueData={filteredRevenueData}
            loading={loading}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default StockData;
