// service-a/src/app/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async produceMessage(): Promise<string> {
    await this.appService.sendMessage('Hello from ServiceA!');
    return 'Message sent to Kafka';
  }
}