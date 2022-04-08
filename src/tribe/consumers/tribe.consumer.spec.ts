import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzedPostService } from '../../analyzedPost/analyzedPost.service';
import { UtilService } from '../../util/util.service';
import { TribeService } from '../services/tribe.service';
import { TribeWebhookDataConsumer } from './tribe.consumer';

describe('TribeConsumer', () => {
  let service: TribeWebhookDataConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribeWebhookDataConsumer],
    })
      .useMocker((token) => {
        if (token === ConfigService) {
          return { get: jest.fn().mockResolvedValue('5') };
        }
        if (token === TribeService) {
          return {
            getMember: jest.fn().mockResolvedValue({ name: 'alireza', id: 1 }),
            getSpace: jest.fn().mockResolvedValue({ name: 'test', id: 1 }),
          };
        }
        if (token === Logger) {
          return {
            log: jest.fn().mockResolvedValue(console.log('this is a atest')),
          };
        }
        if (token === UtilService) {
          return {
            stripText: jest.fn().mockResolvedValue('text'),
            wordCount: jest.fn().mockResolvedValue(4),
          };
        }
        if (token === AnalyzedPostService) {
          return {
            createAnalyzedPost: jest
              .fn()
              .mockResolvedValue('analyzed post created'),
          };
        }
        if (token === 'nlpService') {
          return {
            analyzeSentiment: jest
              .fn()
              .mockResolvedValue({ setiment: 'positive' }),
          };
        }
      })
      .compile();

    service = module.get<TribeWebhookDataConsumer>(TribeWebhookDataConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
