import configuration from './configuration';

describe('Configuration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return default port when PORT is not set', () => {
    const config = configuration();
    expect(config.port).toBe(3000);
  });

  it('should return parsed PORT when set', () => {
    process.env.PORT = '4000';
    const config = configuration();
    expect(config.port).toBe(4000);
  });

  it('should return CO_API_KEY from environment', () => {
    process.env.CO_API_KEY = 'test-api-key';
    const config = configuration();
    expect(config.cohere.apiKey).toBe('test-api-key');
  });

  it('should return default Cohere model when COHERE_MODEL is not set', () => {
    const config = configuration();
    expect(config.cohere.model).toBe('command');
  });

  it('should return COHERE_MODEL from environment when set', () => {
    process.env.COHERE_MODEL = 'custom-model';
    const config = configuration();
    expect(config.cohere.model).toBe('custom-model');
  });

  it('should log a message when called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    configuration();
    expect(consoleSpy).toHaveBeenCalledWith('Loaded ENV Variables:');
    consoleSpy.mockRestore();
  });
});
