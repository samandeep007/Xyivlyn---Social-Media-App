import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'random-social-discovery-api',
      message: 'Backend works',
      timestamp: new Date().toISOString(),
    };
  }
}
