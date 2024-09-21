import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/test') // Definindo a rota /test
  testEndpoint(): string {
    return 'Test endpoint is working';
  }
}
