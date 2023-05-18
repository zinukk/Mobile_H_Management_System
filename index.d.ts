interface Color {
  [index: string]: string;
  main: string;
  sub: string;
  background: string;
  white: string;
  black: string;
  blue: string;
  blue100: string;
  critical: string;
  major: string;
  minor: string;
  stroke: string;
  light: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  gray950: string;
}

interface IResponseError {
  message: string;
}

interface IResponse {
  error_notices: IErrorNotice[];
  error_risk_counts: IErrorRisk[];
  robot_counts: IRobotError[];
  robots: IRobots[];
  statistics: IStatistics[];
  stores: IStore[];
}

interface IErrorNotice {
  created_at: string;
  error_id: string;
  format_date: string;
  k_map_name: string;
  error_msg: string;
  log_id: string;
  map_id: string;
  map_name: string;
  risk_degree: string;
}

interface IErrorRisk {
  critical: string;
  major: string;
  map_id: string;
  map_name: string;
  minor: string;
}

interface IRobotError {
  error: string;
  map_id: string;
  map_name: string;
  refair: string;
  serving: string;
  stay: string;
}

interface IRobot {
  avg_serving_time: string;
  battery: string;
  created_at: string;
  destination: string;
  map_id: string;
  map_name: string;
  move_distance: string;
  performance: string;
  power_on_time: string;
  robot_id: string;
  serving_count: string;
  state: string;
  x_pos: string;
  y_pos: string;
}

interface IStatistics {
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
}

interface IStore {
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
}
