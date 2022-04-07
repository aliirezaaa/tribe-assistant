import { Module } from '@nestjs/common';

import { NlpServiceFactory } from './factories/nlp.factory';
import { UtilService } from '../util/util.service';
/**
 * The nlpService will created by Nlp ServiceFactory based on .env variables or app settings
 */
const nlpService = {
  provide: 'nlpService',
  useFactory: (utilService: UtilService) => {
    return NlpServiceFactory.createNlpService(utilService);
  },
  inject: [UtilService],
};

/**
 * This module manages all classes relate to NlpService
 */
@Module({
  providers: [nlpService, UtilService],
  exports: ['nlpService'],
})
export class NlpModule {}
