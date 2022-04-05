import { Injectable } from '@nestjs/common';
import { UtilService } from 'src/util/util.service';
import { GoogleCloud } from '../thirdParties/google-cloud.service';
@Injectable()
export class NlpServiceFactory {
  public static createNlpService(utilService: UtilService) {
    //TODO:
    const type = 'A';
    if (type === 'A') {
      console.log('google cloud created');

      return new GoogleCloud(utilService);
    } else if (type === 'B') {
      console.log('asdasdasd created');
    }

    return null;
  }
}
