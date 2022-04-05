import { Inject, Injectable } from '@nestjs/common';
import { UtilService } from 'src/util/util.service';
import { INlpService } from '../interfaces/nlp.interface';
import { NlpResult } from '../types/nlp.type';

const Sentiments = {
  ranges: [
    {
      name: 'very negative',
      rangeNumbers: [-1, -0.75],
    },
    {
      name: 'negative',
      rangeNumbers: [-0.75, -0.25],
    },
    {
      name: 'neutral',
      rangeNumbers: [-0.25, 0.25],
    },
    {
      name: 'positive',
      rangeNumbers: [0.25, 0.75],
    },
    {
      name: 'very positive',
      rangeNumbers: [0.75, 1],
    },
  ],
};
@Injectable()
export class GoogleCloud implements INlpService {
  constructor(private utilService: UtilService) {}

  async print() {
    console.log('print from google');
  }
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
      console.log(`Text: ${_text}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      sentimentResult.sentiment = this.calculateSentimentName(sentiment.score);
      sentimentResult.sentimentScore = sentiment.score;
      sentimentResult.sentimentMagnitude = sentiment.magnitude;

      // Classifies text in the document
      const [classification] = await client.classifyText({ document });
      // get category
      console.log('Categories:');
      sentimentResult.category = classification.categories[0].name;
      sentimentResult.categoryConfidence =
        classification.categories[0].confidence;
      classification.categories.forEach((category) => {
        console.log(
          `Name: ${category.name}, Confidence: ${category.confidence}`,
        );
      });
      return sentimentResult;
      /*
      general sentiment with score
      category with score
      */
    } catch (err) {
      console.log(err);
      return null;
    }
  }
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
