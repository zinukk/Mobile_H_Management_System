export type IDates = {
  start_date: string;
  end_date: string;
  map_id: number;
};

export type IServeErrorCount = {
  date: Array<string>;
  error_count: Array<number>;
  serving_count: Array<number>;
};

export type IErrorState = {
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
