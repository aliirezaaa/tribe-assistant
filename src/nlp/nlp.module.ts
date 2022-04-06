import { Module } from '@nestjs/common';

import { NlpServiceFactory } from './factories/nlp.factory';
import { UtilService } from '../util/util.service';
const nlpService = {
  provide: 'nlpService',
  useFactory: (utilService: UtilService) => {
    return NlpServiceFactory.createNlpService(utilService);
  },
  inject: [UtilService],
};
@Module({
  providers: [nlpService, UtilService],
  exports: ['nlpService'],
})
export class NlpModule {}
