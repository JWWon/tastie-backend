import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AccessTokenRequest } from './request';
import { AccessTokenResponse } from './response';
import { HttpExceptionResponseDTO } from '../common/response';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  @Post('token')
  @ApiCreatedResponse({
    description: 'Generate new accessToken',
    type: AccessTokenResponse,
  })
  @ApiNotFoundResponse({
    description: "User isn't registered",
    type: HttpExceptionResponseDTO,
  })
  async accessToken(
    @Body() req: AccessTokenRequest,
  ): Promise<AccessTokenResponse> {
    return {
      type: 'Bearer',
      accessToken: '',
      expiresIn: 1000,
    };
  }
}
