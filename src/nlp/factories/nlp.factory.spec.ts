import { UtilService } from 'src/util/util.service';
import { NlpServiceFactory } from './nlp.factory';
describe('AssistantFactory', () => {
  let nlpfactory: NlpServiceFactory;
  let utilService: UtilService;
  beforeEach(async () => {
    nlpfactory = new NlpServiceFactory();
  });
  it('should be defined', () => {
    expect(nlpfactory).toBeDefined();
  });
  test('createNlpService should returns a nlpService instance', () => {
    const object = NlpServiceFactory.createNlpService(utilService);
    expect(object).toBeTruthy();
    expect(object).toHaveProperty('analyzeSentiment');
  });
});
