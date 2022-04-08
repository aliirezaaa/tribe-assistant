import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzedPostService } from './analyzedPost.service';

describe('AnalyzedPostService', () => {
  let service: AnalyzedPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyzedPostService, Logger],
    })
      .useMocker((token) => {
        if (token === 'AnalyzedPostRepository') {
          return {
            getAnalyzedPost: jest.fn().mockResolvedValue([]),
            createAnalyzedPost: jest.fn().mockResolvedValue([]),
          };
        }
        if (token === 'Logger') {
          return {
            log: jest.fn().mockResolvedValue(() => {
              console.log('this is a test');
            }),
          };
        }
      })
      .compile();

    service = module.get<AnalyzedPostService>(AnalyzedPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
