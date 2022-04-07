import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullConstants } from '../constants/bull.constant';
import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
/**
 * @classdesc
 * This class implements SharedBullConfigurationFactory to create and return the congiguration of Bull module
 */
@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  createSharedConfiguration(): BullModuleOptions | Promise<BullModuleOptions> {
    return {
      redis: {
        host: this.config.get<string>('REDIS_HOST'),
        port: this.config.get<number>('REDIS_PORT'),
      },
    };
  }
}
export const bullQueues: BullModuleOptions = {
  name: BullConstants.BULL_QUEUE_NAME,
};
