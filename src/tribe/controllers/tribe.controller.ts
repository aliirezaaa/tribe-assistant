import { Controller, Post } from '@nestjs/common';
import { TribeService } from '../services/tribe.service';
import { WebhookData } from '../tribe.decorator';
import { Webhook } from '../types/webhook.type';
@Controller('tribe')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}
  @Post('webhook')
  handleTribeWebhook(@WebhookData() webhookData: Webhook) {
    return this.tribeService.analyzePost(webhookData);
  }
}
