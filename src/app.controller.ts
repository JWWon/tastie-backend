import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from '@/app.service';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthy')
  @ApiOperation({ summary: 'Check app status' })
  healthy(): string {
    return '';
  }
}
