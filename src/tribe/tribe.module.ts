import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullConstants } from '../shared/constants/bull.constant';
import { UtilService } from '../util/util.service';
import { TribeController } from './controllers/tribe.controller';
import { TribeService } from './services/tribe.service';
import { BullConfigService } from '../shared/bull/bull.service';
import { TribeWebhookDataConsumer } from './consumers/tribe.consumer';
import { NlpModule } from '../nlp/nlp.module';
import { AnalyzedPostService } from '../analyzedPost/analyzedPost.service';
import { AnalyzedPostModule } from '../analyzedPost/analyzedPost.module';

/**
 * This module manages all classes relate to TribeModule
 */
@Module({
  imports: [
    BullModule.forRootAsync({ useClass: BullConfigService }),
    BullModule.registerQueue({
      name: BullConstants.BULL_QUEUE_NAME,
    }),
    NlpModule,
    AnalyzedPostModule,
  ],
  controllers: [TribeController],
  providers: [
    TribeService,
    UtilService,
    TribeWebhookDataConsumer,
    AnalyzedPostService,
  ],
})
export class TribeModule {}
