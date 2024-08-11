import { Module } from '@nestjs/common';
import { CohereService } from './cohere.service.js';
@Module({
  providers: [CohereService],
  exports: [CohereService],
})
export class CohereModule {}
