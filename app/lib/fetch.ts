import { ReqParamsType, StockInfoType, StockMonthRevenueType } from './definitions';

const baseUrl = 'https://api.finmindtrade.com';

async function get<Req extends Record<string, string>, Res>(
  path: string,
  params: Req
): Promise<Res> {
  const queryParams = new URLSearchParams(params).toString();
  const request = new Request(`${baseUrl}/${path}?${queryParams}`, { method: 'GET' });
  const res: Promise<Res> = (await fetch(request)).json();
  return res;
}

async function getTaiwanStockInfo(params: Partial<ReqParamsType>) {
  const res = await get<Partial<ReqParamsType>, StockInfoType>('api/v4/data', {
    ...params,
    dataset: 'TaiwanStockInfo',
  });
  return res;
}

async function getTaiwanStockMonthRevenue(params: Partial<ReqParamsType>) {
  const res = await get<Partial<ReqParamsType>, StockMonthRevenueType>('api/v4/data', {
    ...params,
    dataset: 'TaiwanStockMonthRevenue',
  });
  return res;
}

export { getTaiwanStockInfo, getTaiwanStockMonthRevenue };
