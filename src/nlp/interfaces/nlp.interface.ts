import { NlpResult } from '../types/nlp.type';

export interface INlpService {
  analyzeSentiment(text: string): NlpResult;
  print(): void;
}
