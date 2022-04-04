import { Injectable } from '@nestjs/common';
import { INlpService } from '../interfaces/nlp.interface';
@Injectable()
export class GoogleCloud implements INlpService {
  //TODO: add type parameter
  //TODO: add type retuntion
  async print() {
    console.log('print from google');
  }
  async analyze(text: string): Promise<void> {
    // Imports the Google Cloud client library
    try {
      // eslint-disable-next-line
      const language = require('@google-cloud/language');

      // Instantiates a client
      const client = new language.LanguageServiceClient();

      // The text to analyze
      const text =
        'The product that I got was like brand new, not a single scratch or sign of wear anywhere. In the box, I got a pair of headphones and a charger, both seemed originial. I personally use a Note9, and I identify myself as a power user, hence just the three stars. See, the phone I got was not the North American variant. It was originally sold in the UAE, which I tracked down using the IMEI number. It had an Exynos 8895 chipset and a Mali G71 gpu, unlike the North American variant, which uses Snapdragon 835 and Ardeno 540 respectively. Exynos versions are a bit less powerful than Snapdragon equivalents. However, the biggest turnoff for me, personally, was that the phone uses a custom ROM instead of Samsungs original ROM. This means, the phone I got will never receive Samsungs software update. Which means no night mode camera, no knox security, no secure folder. I would not have bought this if I knew what I was going to get. For most people, this might not matter, but for me, it does';

      const document = {
        content: text,
        type: 'PLAIN_TEXT',
      };
      console.log('in google cloud');
      // Detects the sentiment of the text
      const [result] = await client.analyzeSentiment({ document: document });
      const sentiment = result.documentSentiment;
      //TODO: calculate general sentiment
      console.log(`Text: ${text}`);
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
