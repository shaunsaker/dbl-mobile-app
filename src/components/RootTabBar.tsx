import React, { ReactElement } from 'react';
import { Routes } from '../router/models';
import { TabBar, Tabs } from './TabBar';

export const ROOT_TABS: Tabs = [
  {
    label: 'LIST',
    route: Routes.homeTabs,
    enabled: true,
  },
];

export const RootTabBar = (): ReactElement => {
  return <TabBar tabs={ROOT_TABS} />;
};
