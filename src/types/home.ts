import { TPerformanceData } from './robot';
import { TErrorNotice } from './robotError';

export type TPerformance = {
  [key: string | number]: TPerformanceByDate;
};

export type TPerformanceByDate = {
  day: TPerformanceData;
  week: TPerformanceData;
  month: TPerformanceData;
};

export type TDateTab = {
  [key: string]: JSX.Element;
};

export type TPerformanceInfo = {
  id: number;
  title: string;
  unit: string;
  currentValue: string;
  prevValue: string;
};

export type TRecentErrors = TErrorNotice & {
  current_node: string;
  error_type: string;
};

export type TRiskDegreeList = {
  id: number;
  degree: string;
  count: number;
};

export type TRiskDegree = {
  [key: string]: number;
  ALL: number;
  MINOR: number;
  MAJOR: number;
  CRITICAL: number;
};

export type TRobotState = {
  id: number;
  state: string;
  color: string;
};

export type TStatistics = {
  id: number;
  title: string;
  count: number | string;
};

export type TStatus = {
  id: number;
  color: string;
  count: number;
};

export type TMap = {
  map_id: string;
  map_name: string;
  store_lat: string;
  store_lng: string;
};

export type TTimeMap = {
  [index: number]: number;
};
