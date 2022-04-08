import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import Bull from 'bull';
import { TribeService } from './tribe.service';

describe('TribeService', () => {
  let service: TribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribeService],
    })
      .useMocker((token) => {
        if (token === 'BullQueue_assistant-queue') {
          return { add: jest.fn().mockResolvedValue('') };
        }
        if (token === ConfigService) {
          return { get: jest.fn().mockResolvedValue('1') };
        }
      })
      .compile();

    service = module.get<TribeService>(TribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('initTribeClient should be called', () => {
    const queue = createMock<Bull.Queue>();
    const config = createMock<ConfigService>();
    const result = '';
    const service = new TribeService(queue, config);
    jest.spyOn(service, 'initTribeClient').mockImplementation(() => result);
    expect(service.initTribeClient).toBeDefined();
  });

  test('getSpace and getMember should be defined', () => {
    expect(service.getSpace).toBeTruthy();
    expect(service.getMember).toBeTruthy();
  });
});
