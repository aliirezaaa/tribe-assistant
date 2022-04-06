import { NlpResult } from '../types/nlp.type';

export interface INlpService {
  analyzeSentiment(text: string): Promise<NlpResult | null>;
  print(): string;
}
