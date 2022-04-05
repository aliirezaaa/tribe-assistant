export interface INlpService {
  analyzeSentiment(text: string): void;
  print(): void;
}
