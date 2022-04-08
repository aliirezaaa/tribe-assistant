import { Injectable } from '@nestjs/common';
import { UtilService } from 'src/util/util.service';
import { INlpService } from '../interfaces/nlp.interface';
import { GoogleNlpService } from '../services/google-nlp.service';

/**
 * @classdesc
 * This class acts as factory for creation nlpService based on .env variable or app settings
 * This class creates "google nlp service" or "microsoft nlp service"
 */
@Injectable()
export class NlpServiceFactory {
  /**
   *
   * @param {UtilService} utilService - An object instance of utilService for injecting to nlpService creation
   * @return - An instance of nlpService
   */
  public static createNlpService(utilService: UtilService): INlpService | null {
    //TODO:
    const type = 'A';
    if (type === 'A') {
      console.log('google cloud created');

      return new GoogleNlpService(utilService);
    } else if (type === 'B') {
      console.log('asdasdasd created');
    }

    return null;
  }
}
