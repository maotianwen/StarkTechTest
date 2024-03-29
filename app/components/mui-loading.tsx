import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ComponentProps } from 'react';

const MuiLoading = (props: ComponentProps<typeof Box>) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      <CircularProgress />
    </Box>
  );
};

export default MuiLoading;
