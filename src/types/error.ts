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
