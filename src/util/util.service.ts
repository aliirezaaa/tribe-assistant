/**
 * this class used dor utilites
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  /**
   * @param {string} orginalText - An orgin text
   * @return {string} - a sripped text
   */
  stripText(orginalText: string): string {
    return orginalText.replace(/(<([^>]+)>)/gi, '');
  }

  /**
   * @param {string} text - A text
   * @return {number} - sentence words count
   */
  wordCount(text: string): number {
    return text.split(' ').length;
  }

  /**
   * @param {number} num1 - One of the limit numbers
   * @param {number} num2 - One of the limit numbers
   * @param {number} value - Specefic number
   * @return {boolean} - is the number between limits?
   */
  isBetween(num1: number, num2: number, value: number): boolean {
    const min = Math.min(num1, num2);
    const max = Math.max(num1, num2);

    return value > min && value < max;
  }
}
