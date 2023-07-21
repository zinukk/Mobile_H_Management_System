import { ReactNode } from 'react';

export type INav = {
  id: number;
  name: string;
  path: string;
  active: JSX.Element;
  disabled: JSX.Element;
};

export type ILayout = {
  children: ReactNode;
};
