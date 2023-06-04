export type IRobotState = {
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

export type IRobotType = {
  id: string;
  option: string;
  color: string | undefined;
};

export type IStoreNameObj = {
  [index: string]: string;
};

export type IRobotStateObj = {
  [index: string]: string;
};
