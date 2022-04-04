import { GoogleCloud } from '../thirdParties/google-cloud.service';

export class NlpFactory {
  public static createNlpService(type: string) {
    if (type === 'A') {
      console.log('google cloud created');
      return new GoogleCloud();
    } else if (type === 'B') {
      console.log('asdasdasd created');
    }

    return null;
  }
}
