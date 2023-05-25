export type IServing = {
  1: IServingByDate;
  2: IServingByDate;
  3: IServingByDate;
  4: IServingByDate;
  901: IServingByDate;
  908: IServingByDate;
  909: IServingByDate;
  910: IServingByDate;
  914: IServingByDate;
  all: IServingByDate;
};

export type IServingByDate = {
  day: IStatistics;
  week: IStatistics;
  month: IStatistics;
};

export type IDateTab = {
  [key: string]: JSX.Element;
  일간: JSX.Element;
  주간: JSX.Element;
  월간: JSX.Element;
};

export type IRecentErrors = {
  error_notice: IErrorNotice[];
};

export type IRiskDegreeList = {
  id: number;
  degree: string;
  count: number;
};

export type IRiskDegree = {
  [key: string]: number;
  all: number;
  minor: number;
  major: number;
  critical: number;
};

export type IErrorStatus = {
  id: number;
  status: string;
  color: string;
};

export type IMap = {
  map_id: string;
  map_name: string;
  store_lat: string;
  store_lng: string;
};
