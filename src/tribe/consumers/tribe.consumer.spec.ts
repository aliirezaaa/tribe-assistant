import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzedPostService } from '../../analyzedPost/analyzedPost.service';
import { UtilService } from '../../util/util.service';
import { TribeService } from '../services/tribe.service';
import { TribeConsumer } from './tribe.consumer';

describe('TribeConsumer', () => {
  let service: TribeConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribeConsumer],
    })
      .useMocker((token) => {
        if (token === ConfigService) {
          return { get: jest.fn().mockResolvedValue('5656') };
        }
        if (token === TribeService) {
          return { get: jest.fn().mockResolvedValue('5656') };
        }
        if (token === UtilService) {
          return { get: jest.fn().mockResolvedValue('5656') };
        }
        if (token === AnalyzedPostService) {
          return { get: jest.fn().mockResolvedValue('5656') };
        }
        if (token === 'nlpService') {
          return { get: jest.fn().mockResolvedValue('5656') };
        }
      })
      .compile();

    service = module.get<TribeConsumer>(TribeConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
