'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1890ff', // 设置主色调
    },
    secondary: {
      main: '#bae0ff', // 设置次要色调
    },
  },
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <div>{children}</div>
      </main>
    </ThemeProvider>
  );
}
