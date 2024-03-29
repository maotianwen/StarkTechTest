import SignalCellularNodataIcon from '@mui/icons-material/SignalCellularNodata';
import Paper from '@mui/material/Paper';

const Empty = ({ visible }: { visible: boolean }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: visible ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        height: 480,
      }}
    >
      <SignalCellularNodataIcon color="disabled" />
      <span style={{ color: '#00000042' }}>暂无数据</span>
    </Paper>
  );
};

export default Empty;
