import { Injectable } from '@nestjs/common';
import { INlpService } from '../interfaces/nlp.interface';
@Injectable()
export class GoogleCloud implements INlpService {
  //TODO: add type retuntion
  async print() {
    console.log('print from google');
  }
  async analyze(_text: string): Promise<void> {
    // Imports the Google Cloud client library
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
      console.log('in google cloud');
      // Detects the sentiment of the text
      const [result] = await client.analyzeSentiment({ document: document });
      const sentiment = result.documentSentiment;
      //TODO: calculate general sentiment
      console.log(`Text: ${_text}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

      const sentences = result.sentences;
      sentences.forEach((sentence) => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`  Score: ${sentence.sentiment.score}`);
        console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
      });
      // Classifies text in the document
      const [classification] = await client.classifyText({ document });
      //TODO: get category
      console.log('Categories:');
      classification.categories.forEach((category) => {
        console.log(
          `Name: ${category.name}, Confidence: ${category.confidence}`,
        );
      });
      //TODO: return
      /*
      general sentiment with score
      category with score
      */
    } catch (err) {
      //TODO: catch error
      console.log(err);
    }
  }
}
