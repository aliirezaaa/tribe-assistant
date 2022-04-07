/**
 * @type
 * This type include these variables:
 * sentiment - general sentiment of text
 * sentimentScore - general sentiment score of text
 * category - a text category
 * categoryConfidence - a text category confidence number
 */
export type NlpResult = {
  sentiment: string;
  sentimentScore: number;
  sentimentMagnitude: number;
  category: string;
  categoryConfidence: number;
};
