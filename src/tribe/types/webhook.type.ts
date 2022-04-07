/**
 * @type
 * This type describes WebhookDataType
 * This type is used for extracting needed webhook data variables
 */
export type WebhookDataType = {
  signature: string;
  requestTimestamp: number;
  dataId: string;
  dataList: any[];
  spaceId: string;
  actorId: string;
};
