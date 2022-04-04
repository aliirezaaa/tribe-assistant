import { Inject, Injectable } from '@nestjs/common';
import { NlpService } from '../nlp/services/nlp.service';

@Injectable()
export class AppService {
  constructor(@Inject('nlpService') private nlpService: NlpService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
