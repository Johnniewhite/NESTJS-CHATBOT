import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotModule } from './chatbot/chatbot.module';
import configuration from './config/configuration.js';
import { CohereModule } from './cohere/cohere.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ChatbotModule,
    CohereModule,
  ],
})
export class AppModule {}
