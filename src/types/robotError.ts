export type TError = {
  error_count: TErrorCount;
  error_notice: Omit<TErrorState[], 'k_map_name' | 'risk_degree'>;
  serve_error_count: TServeErrorCount;
  RFID_sensing_error_node: TErrorOccur | null;
  callback_from_wemos_timeout: TErrorOccur | null;
  charging_RFID_sensing_error: TErrorOccur | null;
  etc: TErrorOccur | null;
  guide_departure: TErrorOccur | null;
  guide_error: TErrorOccur | null;
  low_battery: TErrorOccur | null;
  mega_wemos_communication_error: TErrorOccur | null;
  motor_driver_fault: TErrorOccur | null;
  motor_driver_return_timeout: TErrorOccur | null;
  network: TErrorOccur | null;
  mover_current: TErrorOccur | null;
  over_drive_100cm: TErrorOccur | null;
  over_voltage: TErrorOccur | null;
  path: TErrorOccur | null;
  path_flow_miss: TErrorOccur | null;
  path_matcing_error_node: TErrorOccur | null;
  path_plan_request_timeout: TErrorOccur | null;
  sleep_long: TErrorOccur | null;
  under_voltage: TErrorOccur | null;
};

export type TErrorCount = Omit<TError, 'error_count' | 'error_notice' | 'serve_error_count'>;

export type TErrorOccur = {
  [key: string]: number;
};

export type TErrorNotice = {
  created_at: string;
  error_id: string;
  error_msg: string;
  format_date: string;
  k_map_name: string;
  map_id: string;
  risk_degree: string;
  robot_id: string;
};
export type TErrorRiskCounts = {
  critical: string;
  major: string;
  map_id: string;
  map_name: string;
  minor: string;
};

export type TDateData = {
  start_date: string;
  end_date: string;
  map_id: number;
};

export type TServeErrorCount = {
  date: Array<string>;
  error_count: Array<number>;
  serving_count: Array<number>;
};

export type TErrorState = {
  created_at: string;
  current_node: string;
  error_id: string;
  error_msg: string;
  error_type: string;
  map_id: string;
  robot_id: string;
  k_map_name: string;
  risk_degree: string;
};

export type TErrorDetail = {
  error_content: TErrorContent;
  error_count: TErrorCountByDate;
  error_info: TErrorSubInfo;
  error_list: TErrorState[];
  error_solve_list: TErrorSolution[];
};

export type TErrorContent = {
  content: string;
  manager: string;
};

export type TErrorCountByDate = {
  month_error_count: string;
  month_serving_count: string;
  week_error_count: string;
  week_serving_count: string;
};

export type TErrorSubInfo = {
  battery: string;
  map_existence: string;
  recent_table: string;
  robot_path: string;
};

export type TCountInfo = {
  id: number;
  title: string;
  description: string;
};

export type TErrorSolution = {
  content: string;
  created_at: string;
  error_id: string;
  error_type: string;
  is_solved: null | string;
  manager: string;
  map_id: string;
  robot_id: string;
};
