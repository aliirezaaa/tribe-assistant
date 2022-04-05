import { NlpServiceFactory } from './nlp.factory';

describe('AssistantFactory', () => {
  it('should be defined', () => {
    expect(new NlpServiceFactory()).toBeDefined();
  });
});
