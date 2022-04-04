import { Injectable } from '@nestjs/common';
import { INlpService } from '../interfaces/nlp.interface';

@Injectable()
export class NlpService implements INlpService {
  print(): void {
    throw new Error('Method not implemented.');
  }
  analyze(text: string): void {
    throw new Error('Method not implemented.');
  }
}
