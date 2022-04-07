import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Webhook } from './types/webhook.type';
export const WebhookData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const webhookData: Webhook = {
      signature: request.headers['x-tribe-signature'],
      requestTimestamp: request.headers['x-tribe-request-timestamp'],
      dataId: request.body.data.id,
      dataList: request.body.data.object.mappingFields,
      spaceId: request.body.data.object.spaceId,
      actorId: request.body.data.actor.id,
    };

    return webhookData;
  },
);
