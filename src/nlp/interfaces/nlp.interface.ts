import { NlpResult } from '../types/nlp.type';
/**
 * @interface
 * This interface describes methods of nlpService
 */
export interface INlpService {
  analyzeSentiment(text: string): Promise<NlpResult | null>;
}
