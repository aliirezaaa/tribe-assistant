import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
   * @param {ConfigService} config - An object instance of configService for accesing enviroment variables
   * @return - An instance of nlpService
   */
  public static createNlpService(
    utilService: UtilService,
    config: ConfigService,
  ): INlpService | null {
    const type = config.get<string>('NLP_SERVICE');
    if (type === 'google') {
      return new GoogleNlpService(utilService);
    } else if (type === 'microsoft') {
      throw new Error('this feature should be implement');
    }

    return null;
  }
}
