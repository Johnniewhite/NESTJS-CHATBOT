import { validate } from 'class-validator';
import { ChatRequestDto } from './chat-request.dto';

describe('ChatRequestDto', () => {
  it('should be defined', () => {
    expect(new ChatRequestDto()).toBeDefined();
  });

  it('should have a message property', () => {
    const dto = new ChatRequestDto();
    expect(dto).toHaveProperty('message');
  });

  it('should validate a valid message', async () => {
    const dto = new ChatRequestDto();
    dto.message = 'Hello, world!';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate an empty message', async () => {
    const dto = new ChatRequestDto();
    dto.message = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should not validate a non-string message', async () => {
    const dto = new ChatRequestDto();
    (dto as any).message = 123;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
