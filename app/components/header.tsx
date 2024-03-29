import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTaiwanStockInfo } from '../lib/fetch';
import CircularProgress from '@mui/material/CircularProgress';
import type { StockInfoType, ArrayElementType } from '../lib/definitions';
import Paper from '@mui/material/Paper';
import { useStore } from '@/app/store';

const Header = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setStockTitle = useStore((state) => state.setStockTitle);

  const [options, setOptions] = useState<
    (ArrayElementType<StockInfoType['data']> & { index: number })[]
  >([]);

  useEffect(() => {
    (async () => {
      const opt = await getTaiwanStockInfo({});
      if (opt.status === 200) {
        setOptions(opt.data.map((item, index) => ({ ...item, index })));
      }
    })();
  }, []);

  const [value, setValue] = useState<ArrayElementType<typeof options> | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const id = params.get('id');
    if (id) {
      const defaultValue = options.find(
        (item) => `${item.stock_id}_${item.index}` === id
      );
      if (defaultValue) {
        setValue(defaultValue);
        setInputValue(
          `${defaultValue.stock_id}${defaultValue.industry_category}${defaultValue.stock_name}`
        );
        setStockTitle(`${defaultValue.stock_name}（${defaultValue.stock_id}）`);
      }
    }
  }, [searchParams, options, setStockTitle]);

  const handleSelect = (value: ArrayElementType<typeof options> | null) => {
    if (value) {
      const id = `${value.stock_id}_${value.index}`;
      const params = new URLSearchParams(searchParams);
      params.set('id', id);
      replace(`${pathname}?${params.toString()}`);
      setValue(value);
    }
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: '20px',
          marginBottom: '30px',
        }}
      >
        {options.length > 0 ? (
          <Autocomplete
            disablePortal
            getOptionLabel={(option) =>
              `${option.stock_id}${option.industry_category}${option.stock_name}`
            }
            getOptionKey={(option) => `${option.stock_id}_${option.index}`}
            options={options}
            isOptionEqualToValue={(option, selectedOption) =>
              `${option.stock_id}_${option.index}` ===
              `${selectedOption.stock_id}_${selectedOption.index}`
            }
            value={value}
            inputValue={inputValue}
            onInputChange={(e, value) => setInputValue(value)}
            onChange={(e, value) => handleSelect(value)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} placeholder="输入台/美股代号，查看公司价值" />
            )}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Paper>
  );
};

export default Header;
