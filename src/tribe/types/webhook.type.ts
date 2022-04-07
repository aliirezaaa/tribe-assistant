export type Webhook = {
  signature: string;
  requestTimestamp: number;
  dataId: string;
  dataList: any[];
  spaceId: string;
  actorId: string;
};
