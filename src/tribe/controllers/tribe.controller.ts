import { Body, Controller, Post } from '@nestjs/common';
import { TribeService } from '../services/tribe.service';

@Controller('tribe')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}
  @Post('webhook')
  handleTribeWebhook(@Body() webhookBody: any) {
    //TODO: pass body to func
    return this.tribeService.analyzePost(webhookBody);
  }
}
