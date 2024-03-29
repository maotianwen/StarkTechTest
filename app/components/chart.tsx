import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { calGrowthRate, formatNumberWithCommas } from '@/app/lib/utils';
import MuiLoading from './mui-loading';
import Box from '@mui/material/Box';
import { useEffect, useRef, useMemo } from 'react';
import type { StockMonthRevenueType } from '@/app/lib/definitions';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | TooltipComponentOption
>;

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const Chart = ({
  data = [],
  filteredRevenueData = [],
  loading,
}: {
  data: StockMonthRevenueType['data'] | undefined;
  filteredRevenueData: StockMonthRevenueType['data'] | undefined;
  loading: boolean;
}) => {
  const option = useMemo<ECOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      legend: {
        data: ['每月营收', '单月营收年增率'],
      },
      xAxis: [
        {
          type: 'category',
          data: filteredRevenueData?.map(
            (item) => `${item.revenue_year}/${item.revenue_month}`
          ),
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '千元',
          axisLabel: {
            formatter: '{value}',
            rotate: 45,
          },
        },
        {
          type: 'value',
          name: '%',
          axisLabel: {
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          name: '每月营收',
          type: 'bar',
          itemStyle: {
            color: '#faad14',
          },
          tooltip: {
            valueFormatter: function (value) {
              if (typeof value === 'number') {
                return formatNumberWithCommas(value);
              }
              return `${value}`;
            },
          },
          data: filteredRevenueData?.map((item) => item.revenue),
        },
        {
          name: '单月营收年增率',
          type: 'line',
          itemStyle: {
            color: '#cf1322',
          },
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return `${value}%`;
            },
          },
          data: calGrowthRate(data, filteredRevenueData),
        },
      ],
    }),
    [data, filteredRevenueData]
  );

  const chartDomRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  useEffect(() => {
    if (chartDomRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartDomRef.current);
      }
      chartInstance.current.setOption(option);
    }
  }, [option]);
  return (
    <>
      <MuiLoading sx={{ display: loading ? 'flex' : 'none', height: 400 }} />
      <Box
        ref={chartDomRef}
        sx={{ height: 400, display: loading ? 'none' : 'flex' }}
      ></Box>
    </>
  );
};

export default Chart;
