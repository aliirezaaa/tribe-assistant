import { GoogleNlpService } from './google-nlp.service';
import { UtilService } from '../../util/util.service';

describe('Google NLP service', () => {
  let googleNlpService: GoogleNlpService;
  let util: UtilService;

  beforeEach(async () => {
    util = new UtilService();
    googleNlpService = new GoogleNlpService(util);
  });
  it('should be defined', () => {
    expect(googleNlpService).toBeDefined();
  });

  test('calculateSentimentName function returns correct result', () => {
    const result = googleNlpService.calculateSentimentName(0.5);
    expect(result).toBe('positive');
  });
  test('google creditional exists', () => {
    expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).toBeTruthy();
  });
});
