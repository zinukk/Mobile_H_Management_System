import { TPerformanceData, TRobot, TRobotState } from './robot';
import { TErrorNotice, TErrorRiskCounts } from './robotError';

export type TStore = {
  error_notices: TErrorNotice[];
  error_risk_counts: TErrorRiskCounts[];
  robot_counts: TRobotState[];
  robots: TRobot[];
  statistics: TPerformanceData[];
  stores: TStoreInfo[];
};

export type TStoreInfo = {
  created_at: string;
  descirbe: string;
  error: string;
  error_count: string;
  home: string;
  img_src: string;
  location: string;
  login: string;
  map_id: string;
  map_name: string;
  performance: string;
  refair: string;
  serving: string;
  serving_count: string;
  start_dir: string;
  start_node: string;
  stay: string;
  store_lat: string;
  store_lng: string;
  total: number;
  wifi_id: string;
  wifi_pw: string;
};

export interface TStoreDetail extends TStore {
  week: TServingCounts[];
  month: TServingCounts[];
}

export type TServingCounts = {
  hours: string;
  avg_cnt: string;
};

export type TStoreDescription = {
  id: number;
  title: string;
  description: string;
};
