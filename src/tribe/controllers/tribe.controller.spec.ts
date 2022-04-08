import { Test, TestingModule } from '@nestjs/testing';
import { TribeService } from '../services/tribe.service';
import { WebhookDataType } from '../types/webhook.type';
import { TribeController } from './tribe.controller';

describe('TribeController', () => {
  let controller: TribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribeController],
    })
      .useMocker((token) => {
        if (token === TribeService) {
          return { analyzePost: jest.fn().mockResolvedValue('ok') };
        }
      })
      .compile();

    controller = module.get<TribeController>(TribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('the webhook result should be ok', async () => {
    const result = 'ok';
    const webhookData: WebhookDataType = {
      signature: '',
      requestTimestamp: 0,
      dataId: '',
      dataList: [],
      spaceId: '',
      actorId: '',
      publishedAt: '',
      rawBody: undefined,
    };

    expect(await controller.handleTribeWebhook(webhookData)).toBe(result);
  });
});
