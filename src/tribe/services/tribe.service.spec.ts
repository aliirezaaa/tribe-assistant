import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TribeService } from './tribe.service';

describe('TribeService', () => {
  let service: TribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribeService],
    })
      .useMocker((token) => {
        if (token === 'BullQueue_assistant-queue') {
          return { findAll: jest.fn().mockResolvedValue('') };
        }
        if (token === ConfigService) {
          return { get: jest.fn().mockResolvedValue('5656') };
        }
      })
      .compile();

    service = module.get<TribeService>(TribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
