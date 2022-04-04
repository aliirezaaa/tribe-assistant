import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  stripText(orginalText: string) {
    return orginalText.replace(/(<([^>]+)>)/gi, '');
  }
  wordCount(text: string) {
    return text.split(' ').length;
  }
}
