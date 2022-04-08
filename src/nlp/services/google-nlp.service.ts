import { Injectable } from '@nestjs/common';
import { UtilService } from '../../util/util.service';
import { Sentiments } from '../constants/google.constant';
import { INlpService } from '../interfaces/nlp.interface';
import { NlpResult } from '../types/nlp.type';
/**
 * This class implements INlpService interface and includes functions related to classifying sentiment text using external API
 */
@Injectable()
export class GoogleNlpService implements INlpService {
  constructor(private utilService: UtilService) {}

  /**
   * @function
   * This function receives a text and extracts its sentiment using google NLP API
   * @param  {string} _text - A text that should be analyzed and classify its sentiment
   * @return {NlpResult | null} -  An object of NlpResult or null if any error occurs
   */
  async analyzeSentiment(_text: string): Promise<NlpResult | null> {
    // Imports the Google Cloud client library
    const sentimentResult: NlpResult = {
      sentiment: '',
      sentimentScore: 0,
      sentimentMagnitude: 0,
      category: '',
      categoryConfidence: 0,
    };
    try {
      // eslint-disable-next-line
      const language = require('@google-cloud/language');

      // Instantiates a client
      const client = new language.LanguageServiceClient();

      // The text to analyze
      const document = {
        content: _text,
        type: 'PLAIN_TEXT',
      };
      // Detects the sentiment of the text
      const [result] = await client.analyzeSentiment({ document: document });
      const sentiment = result.documentSentiment;

      //general sentiment
      sentimentResult.sentiment = this.calculateSentimentName(sentiment.score);
      sentimentResult.sentimentScore = sentiment.score;
      sentimentResult.sentimentMagnitude = sentiment.magnitude;

      // Classifies text in the document
      const [classification] = await client.classifyText({ document });
      // get category

      sentimentResult.category = classification.categories[0].name;
      sentimentResult.categoryConfidence =
        classification.categories[0].confidence;

      return sentimentResult;
    } catch (err) {
      console.log('analyzeSentiment', err);
      return null;
    }
  }

  /**
   * @function
   * Return sentement name using sentiment score
   * @param {number} sentimentScore - sentiment score number
   * @return {string} - name of the sentiment
   */
  calculateSentimentName(sentimentScore: number): string {
    for (const rang of Sentiments.ranges) {
      if (
        this.utilService.isBetween(
          rang.rangeNumbers[0],
          rang.rangeNumbers[1],
          sentimentScore,
        )
      )
        return rang.name;
    }
  }
}
