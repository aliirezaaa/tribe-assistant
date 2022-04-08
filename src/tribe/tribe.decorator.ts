import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WebhookDataType } from './types/webhook.type';

/**
 * @function
 * This function extracts needed webhook data variables from request
 * @param {ExecutionContext} ctx - An ExecutionContext
 * @return {WebhookDataType} - A WebhookDataType object
 */
export const WebhookData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const webhookData: WebhookDataType = {
      signature: request.headers['x-tribe-signature'],
      requestTimestamp: request.headers['x-tribe-request-timestamp'],
      dataId: request.body.data.id,
      dataList: request.body.data.object.mappingFields,
      spaceId: request.body.data.object.spaceId,
      actorId: request.body.data.actor.id,
      publishedAt: request.body.data.object.publishedAt,
      rawBody: request.rawBody,
    };

    return webhookData;
  },
);
