import { Controller, Post, Body } from '@nestjs/common';
import { CohereService } from './chatbot.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly cohereService: CohereService) {}

  @Post()
  async chat(@Body() chatRequestDto: ChatRequestDto): Promise<ChatResponseDto> {
    const response = await this.cohereService.generate(chatRequestDto.message);
    return {
      response: response.generations[0].text,
    } as unknown as ChatResponseDto;
  }
}
