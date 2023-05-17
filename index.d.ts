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
