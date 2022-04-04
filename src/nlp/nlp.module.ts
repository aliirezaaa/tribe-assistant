import { Module } from '@nestjs/common';

import { NlpService } from './services/nlp.service';
import { NlpFactory } from './factories/nlp.factory';
const nlpService = {
  provide: 'nlpService',
  useFactory: () => {
    return NlpFactory.createNlpService('A');
  },
  inject: [NlpService],
};
@Module({
  providers: [nlpService, NlpService],
  exports: ['nlpService'],
})
export class AiModule {}
