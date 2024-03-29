import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { StockMonthRevenueType } from '@/app/lib/definitions';
import { formatNumberWithCommas, padZero } from '@/app/lib/utils';
import { useRef, useEffect } from 'react';
import MuiLoading from './mui-loading';
import { calGrowthRate } from '@/app/lib/utils';

export default function RevenueTable({
  data = [],
  filteredRevenueData = [],
  loading,
}: {
  data: StockMonthRevenueType['data'] | undefined;
  filteredRevenueData: StockMonthRevenueType['data'] | undefined;
  loading: boolean;
}) {
  const stickyColStyle = {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    whiteSpace: 'nowrap',
    backgroundColor: 'white',
  };

  const tableRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      if (table.scrollWidth > table.clientWidth) {
        table.scrollLeft = table.scrollWidth - table.clientWidth;
      }
    }
  }, [data]);

  return (
    <TableContainer ref={tableRef}>
      {loading ? (
        <MuiLoading
          sx={{
            height: '140px',
          }}
        />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...stickyColStyle,
                }}
              >
                年度月份
              </TableCell>
              {filteredRevenueData?.map((item) => (
                <TableCell key={item.date} align="right">
                  {item.revenue_year}
                  {padZero(item.revenue_month)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  ...stickyColStyle,
                  fontWeight: 500,
                }}
              >
                每月营收
              </TableCell>
              {filteredRevenueData?.map((item) => (
                <TableCell key={item.date} align="right">
                  {formatNumberWithCommas(item.revenue)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  ...stickyColStyle,
                  fontWeight: 500,
                }}
              >
                单月营收年增率（%）
              </TableCell>
              {calGrowthRate(data, filteredRevenueData)?.map((rate, index) => (
                <TableCell key={index} align="right">
                  {rate}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
