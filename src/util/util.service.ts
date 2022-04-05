import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  stripText(orginalText: string): string {
    return orginalText.replace(/(<([^>]+)>)/gi, '');
  }
  wordCount(text: string): number {
    return text.split(' ').length;
  }
  isBetween(num1: number, num2: number, value: number): boolean {
    const min = Math.min(num1, num2);
    const max = Math.max(num1, num2);

    return value > min && value < max;
  }
}
