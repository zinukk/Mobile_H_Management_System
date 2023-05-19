export interface IStoreDetail extends IResponse {
  week: IServedCounts[];
  month: IServedCounts[];
}

export type IServedCounts = {
  hours: string;
  avg_cnt: string;
};
