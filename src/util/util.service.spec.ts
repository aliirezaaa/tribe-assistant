import { Test, TestingModule } from '@nestjs/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilService],
    }).compile();

    service = module.get<UtilService>(UtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  test('stripText should return correct text', () => {
    const result = service.stripText('<p>test</p>');
    expect(result).toBe('test');
  });
  test('wordCount should return correct value', () => {
    const result = service.wordCount('this is a test');
    expect(result).toBe(4);
  });
  test('isBetween should return correct value', () => {
    const result = service.isBetween(1, 10, 5);
    expect(result).toBe(true);
  });
});
