import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AccessTokenRequest, AccessTokenResponse } from './dto';
import { AccessTokenRequestSchema } from './schema';
import { HttpExceptionResponseDTO } from '../common/response';
import { JoiValidationPipe } from '@/web/validation';
import { AuthService } from '@/domain/auth';
import { SignupRequest } from './dto/signupRequest';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}

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
    @Body(new JoiValidationPipe(AccessTokenRequestSchema))
    req: AccessTokenRequest,
  ): Promise<AccessTokenResponse> {
    return {
      type: 'Bearer',
      accessToken: 'not yet',
      expiresIn: 3600,
    };
    // const token = await this.authService.getAccessToken(req);
    // return token;
  }

  @Post('signup')
  async signup(@Body() req: SignupRequest): Promise<AccessTokenResponse> {
    return {
      type: 'Bearer',
      accessToken: 'not yet',
      expiresIn: 3600,
    };
    // const token = await this.authService.signup(req);
    // return token;
  }
}
