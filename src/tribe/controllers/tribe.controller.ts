import { Body, Controller, Post } from '@nestjs/common';
import { TribeService } from '../services/tribe.service';

@Controller('tribe')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}
  @Post('webhook')
  handleTribeWebhook(@Body() webhookBody: any) {
    //TODO: Verifying webhook requests
    //TODO:X-Tribe-Request-Timestamp and a unique data.id.
    return this.tribeService.analyzePost(webhookBody);
  }
}
