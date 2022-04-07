import { Controller, Post } from '@nestjs/common';
import { TribeService } from '../services/tribe.service';
import { WebhookData } from '../tribe.decorator';
import { WebhookDataType } from '../types/webhook.type';
/**
 * @classdesc
 * This class defines tribe webhook handler
 * The route of the webhook is "/tribe/webhook" in the POST HTTP method
 */
@Controller('tribe')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}
  /**
   *
   * @param {WebhookDataType} webhookData - A cleaned webhookData
   * @return - 200 statusCode and a "webhook data has been received" message
   */
  @Post('webhook')
  handleTribeWebhook(@WebhookData() webhookData: WebhookDataType) {
    return this.tribeService.analyzePost(webhookData);
  }
}
