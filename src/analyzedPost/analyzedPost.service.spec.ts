import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzedPostService } from './analyzedPost.service';

describe('PostService', () => {
  let service: AnalyzedPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyzedPostService],
    })
      .useMocker((token) => {
        if (token === 'AnalyzedPostRepository') {
          return { findAll: jest.fn().mockResolvedValue([]) };
        }
      })
      .compile();

    service = module.get<AnalyzedPostService>(AnalyzedPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
