export type TPerformance = {
  [key: string | number]: TPerformanceByDate;
};

export type TPerformanceByDate = {
  day: TPerformanceData;
  week: TPerformanceData;
  month: TPerformanceData;
};

export type TPerformanceData = {
  avg_serving_time: string;
  avg_serving_time_before: string;
  created_at: string;
  day_type: string;
  map_id: string;
  map_name: string;
  move_distance: string;
  move_distance_before: string;
  performance: string;
  performance_before: string;
  serving_count: string;
  serving_count_before: string;
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

export type TRecentErrors = {
  error_notice: TErrorNotice[];
};

export type TRiskDegreeList = {
  id: number;
  degree: string;
  count: number;
};

export type TRiskDegree = {
  [key: string]: number;
  all: number;
  minor: number;
  major: number;
  critical: number;
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
