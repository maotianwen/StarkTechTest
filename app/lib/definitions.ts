type DataSetType = 'TaiwanStockInfo' | 'TaiwanStockMonthRevenue';

type ReqParamsType = {
  dataset: DataSetType;
  data_id: string;
  start_date: string;
  end_date: string;
};

type ResType<T> = {
  msg: string;
  status: 200 | 400;
  data: T;
};

type StockInfoType = ResType<
  {
    date: string;
    industry_category: string;
    stock_id: string;
    stock_name: string;
    type: string;
  }[]
>;

type StockMonthRevenueType = ResType<
  {
    country: string;
    date: string;
    revenue: number;
    revenue_month: number;
    revenue_year: number;
    stock_id: string;
  }[]
>;

type ArrayElementType<T extends any[]> = T extends (infer U)[] ? U : never;

export type {
  ReqParamsType,
  DataSetType,
  StockInfoType,
  StockMonthRevenueType,
  ArrayElementType,
};
