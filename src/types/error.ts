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

export type IErrorDetail = {
  error_content: IErrorContent;
  error_count: IErrorCount;
  error_info: IErrorInfo;
  error_list: IErrorState[];
  error_solve_list: IErrorState[];
};

export type IErrorContent = {
  content: string;
  manager: string;
};

export type IErrorCount = {
  month_error_count: string;
  month_serving_count: string;
  week_error_count: string;
  week_serving_count: string;
};

export type IErrorInfo = {
  battery: string;
  map_existence: string;
  recent_table: string;
  robot_path: string;
};

export type IConstantData = {
  id: number;
  title: string;
  description: string;
};
