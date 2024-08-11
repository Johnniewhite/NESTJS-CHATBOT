import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { CohereService } from './chatbot.service';
import { CohereModule } from '../cohere/cohere.module';

@Module({
  imports: [CohereModule],
  controllers: [ChatbotController],
  providers: [CohereService],
})
export class ChatbotModule {}
