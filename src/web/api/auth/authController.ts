import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  @Post('token')
  async accessToken(): Promise<void> {}
}
