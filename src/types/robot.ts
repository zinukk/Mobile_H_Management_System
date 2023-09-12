export type TRobot = {
  battery: string;
  current_node: string;
  distance: string;
  error_type: string;
  final_node: string;
  k_map_name: string;
  map_id: string;
  map_name: string;
  max_voltage: string;
  min_voltage: string;
  robot_home: string;
  robot_id: string;
  robot_state: string;
  serial_number: string;
  serving_count: string;
  start_at: string;
  state: string;
  table_id: string;
  target_node: string;
  updated_at: string;
};

export type TRobotInfo = {
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

export type TRobotState = {
  error: string;
  map_id: string;
  map_name: string;
  refair: string;
  serving: string;
  stay: string;
};

export type TRobotRiskDegree = {
  [key: string]: number;
  all: number;
  minor: number;
  major: number;
  critical: number;
};

export type TRobotType = {
  id: string;
  option: string;
  color: string | undefined;
};
