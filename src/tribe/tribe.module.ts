import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BullConstants } from 'src/shared/bull/constant';
import { UtilService } from 'src/util/util.service';
import { TribeController } from './controllers/tribe.controller';
import { TribeService } from './services/tribe.service';
import { BullConfigService } from '../shared/bull/bull.service';
import { AudioConsumer } from './consumers/tribe.consumer';
import { NlpService } from 'src/nlp/services/nlp.service';
import { AiModule } from 'src/nlp/nlp.module';

@Module({
  imports: [
    BullModule.forRootAsync({ useClass: BullConfigService }),
    BullModule.registerQueue({
      name: BullConstants.BULL_QUEUE_NAME,
    }),
    AiModule,
  ],
  controllers: [TribeController],
  providers: [TribeService, UtilService, AudioConsumer, NlpService],
})
export class TribeModule {}
