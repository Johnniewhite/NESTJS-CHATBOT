import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CohereClient } from 'cohere-ai';
import { CohereResponse } from '../chatbot/interfaces/cohere-response.interface';

@Injectable()
export class CohereService {
  private cohere: CohereClient;

  constructor(private configService: ConfigService) {
    this.cohere = new CohereClient({
      token: this.configService.get<string>('cohere.apiKey'),
    });
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
