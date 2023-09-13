import { ReactNode } from 'react';

export type TNav = {
  id: number;
  name: string;
  path: string;
  active: JSX.Element;
  disabled: JSX.Element;
};

export type TDropDown = {
  id: string;
  option: string;
};

export type TArrayOfString = Array<string>;

export type TArrayOfNumber = Array<number>;

export type TLayout = {
  children: ReactNode;
};

export type TStoreNameObj = {
  [index: string]: string;
};

export type TRobotStateObj = {
  [index: string]: string;
};

export type TErrorCodeObject = {
  [index: string]: string;
};
