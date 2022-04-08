/**
 * this class used dor utilites
 */
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
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

  isSignatureValid(
    token: string,
    secret: string,
    rawBody: any,
    timestamp: number,
  ): boolean {
    try {
      const MILLISECONDS_IN_MINUTE = 1000 * 60;

      const getSignature = (options: {
        secret: string;
        body: string;
        timestamp: number;
      }): string => {
        const { secret, body, timestamp } = options;
        return crypto
          .createHmac('sha256', secret)
          .update(`${timestamp}:${body}`)
          .digest('hex');
      };
      const verifySignature = (options: {
        signature: string;
        secret: string;
        body: string;
        timestamp: number;
      }): boolean => {
        const { signature, secret, body, timestamp } = options;
        const timeDifference =
          (timestamp - new Date().getTime()) / MILLISECONDS_IN_MINUTE;
        if (timeDifference > 5) return false;
        const hash = getSignature({ secret, body, timestamp });
        return crypto.timingSafeEqual(
          Buffer.from(signature),
          Buffer.from(hash),
        );
      };

      return verifySignature({
        signature: token,
        secret: secret,
        body: rawBody,
        timestamp: timestamp,
      });
    } catch (error) {
      console.log('isSignatureValid', error);
      return false;
    }
  }
}
