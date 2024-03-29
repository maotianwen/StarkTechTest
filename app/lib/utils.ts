import { StockMonthRevenueType } from './definitions';

function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

function getDateNYearsAgo(n: number): string {
  const currentDateObj = new Date();
  const year = currentDateObj.getFullYear() - n;
  const month = currentDateObj.getMonth() + 1; // 月份从 0 开始，需要加 1
  const day = currentDateObj.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
  return formattedDate;
}

function calGrowthRate(
  data: StockMonthRevenueType['data'],
  filteredData: StockMonthRevenueType['data']
) {
  const res = [];
  for (const item of filteredData) {
    const lastYearItem = data.find(
      (pre) =>
        pre.revenue_month === item.revenue_month &&
        pre.revenue_year + 1 === item.revenue_year
    );
    if (lastYearItem) {
      const growthRateItem = (item.revenue / lastYearItem?.revenue - 1) * 100;
      res.push(growthRateItem.toFixed(2));
    }
  }
  return res;
}

export { formatNumberWithCommas, padZero, getDateNYearsAgo, calGrowthRate };
