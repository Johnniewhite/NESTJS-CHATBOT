import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CohereClient } from 'cohere-ai';
import { CohereResponse } from '../chatbot/interfaces/cohere-response.interface';

@Injectable()
export class CohereService {
  private cohere: CohereClient;

  constructor(private configService: ConfigService) {
    const apiKey = 'BF1L5gIDmHAVKZrnBYRHEJqaAPIiiSQCNDttgoDU';
    if (!apiKey) {
      throw new Error('Cohere API key is not set');
    }
    this.cohere = new CohereClient({ token: apiKey });
  }

  async generate(prompt: string): Promise<CohereResponse> {
    const response = await this.cohere.generate({
      model: this.configService.get<string>('cohere.model'),
      prompt,
      maxTokens: 300,
      temperature: 0.9,
      k: 0,
      p: 0.75,
      frequencyPenalty: 0,
      presencePenalty: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE',
    });
    return response as CohereResponse;
  }
}
