'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { ComponentProps, useState } from 'react';

const menuData = [
  {
    code: 'B',
    text: '最新动态',
    children: [
      { code: 'A', text: '每月营收' },
      { code: 'B', text: '每股盈余' },
      { code: 'C', text: '每股净值' },
    ],
  },
  { code: 'F', text: '股票健诊', children: [{ code: 'B', text: '每股盈余' }] },
  { code: 'C', text: '财务报表', children: [{ code: 'B', text: '每股盈余' }] },
  { code: 'D', text: '获利能力', children: [{ code: 'B', text: '每股盈余' }] },
  {
    code: 'E',
    text: '安全性分析',
    children: [{ code: 'B', text: '每股盈余' }],
  },
  {
    code: 'Q',
    text: '成长力分析',
    children: [{ code: 'B', text: '每股盈余' }],
  },
  { code: 'J', text: '价值评估', children: [{ code: 'B', text: '每股盈余' }] },
  {
    code: 'G',
    text: '董监与筹码',
    children: [{ code: 'B', text: '每股盈余' }],
  },
  { code: 'H', text: '关键指标', children: [{ code: 'B', text: '每股盈余' }] },
  { code: 'I', text: '产品组合', children: [{ code: 'B', text: '每股盈余' }] },
];

const Menu = () => {
  const [value, setValue] = useState<string>('B');
  const handleChange: ComponentProps<typeof Tabs>['onChange'] = (event, newValue) => {
    setValue(newValue);
    const childTabs = menuData.find((menuItem) => menuItem.code === newValue)?.children;
    if (childTabs) {
      setSecondLevelTab(childTabs);
      setChildValue(childTabs[0].code);
    }
  };

  const [secondLevelTab, setSecondLevelTab] = useState<{ code: string; text: string }[]>(
    []
  );
  const [childValue, setChildValue] = useState<string>('B');

  return (
    <Grid container wrap="nowrap">
      <Grid item md={6}>
        <Tabs orientation="vertical" value={value} onChange={handleChange}>
          {menuData.map((menuItem) => (
            <Tab
              sx={{ whiteSpace: 'nowrap' }}
              label={menuItem.text}
              key={menuItem.code}
              value={menuItem.code}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item md={4}>
        <Tabs
          orientation="vertical"
          value={childValue}
          onChange={(e, value) => setChildValue(value)}
        >
          {secondLevelTab?.map((menuItem) => (
            <Tab
              sx={{ whiteSpace: 'nowrap' }}
              label={menuItem.text}
              key={menuItem.code}
              value={menuItem.code}
            />
          ))}
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default Menu;
