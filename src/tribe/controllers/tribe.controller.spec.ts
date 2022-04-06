import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TribeService } from '../services/tribe.service';
import { TribeController } from './tribe.controller';

describe('TribeController', () => {
  let controller: TribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribeController],
    })
      .useMocker((token) => {
        if (token === TribeService) {
          return { findAll: jest.fn().mockResolvedValue('') };
        }
        if (token === ConfigService) {
          return { findAll: jest.fn().mockResolvedValue('') };
        }
      })
      .compile();

    controller = module.get<TribeController>(TribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
