import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullConstants } from 'src/shared/bull/constant';
import { UtilService } from 'src/util/util.service';
import { TribeController } from './controllers/tribe.controller';
import { TribeService } from './services/tribe.service';
import { BullConfigService } from '../shared/bull/bull.service';
import { TribeConsumer } from './consumers/tribe.consumer';
import { AiModule } from 'src/nlp/nlp.module';
import { AnalyzedPostService } from 'src/analyzedPost/analyzedPost.service';
import { AnalyzedPostModule } from 'src/analyzedPost/analyzedPost.module';

@Module({
  imports: [
    BullModule.forRootAsync({ useClass: BullConfigService }),
    BullModule.registerQueue({
      name: BullConstants.BULL_QUEUE_NAME,
    }),
    AiModule,
    AnalyzedPostModule,
  ],
  controllers: [TribeController],
  providers: [TribeService, UtilService, TribeConsumer, AnalyzedPostService],
})
export class TribeModule {}
