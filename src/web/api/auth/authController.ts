import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AccessTokenRequest, AccessTokenResponse } from './dto';
import { AccessTokenRequestSchema, SignupRequestSchema } from './schema';
import { HttpExceptionResponseDTO } from '../common/response';
import { JoiValidationPipe } from '@/web/validation';
import { AuthService } from '@/domain/auth';
import { SignupRequest } from './dto/signupRequest';
import {
  AlreadyExistsAccountError,
  InvalidCredentialError,
  NotFoundAccountError,
} from '@/domain/auth/exception';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiCreatedResponse({
    description: 'Generate new accessToken',
    type: AccessTokenResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid user credential',
    type: HttpExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: "User isn't registered",
    type: HttpExceptionResponseDTO,
  })
  async accessToken(
    @Body(new JoiValidationPipe(AccessTokenRequestSchema))
    req: AccessTokenRequest,
  ): Promise<AccessTokenResponse> {
    let token: AccessTokenResponse;

    try {
      token = await this.authService.getAccessToken(req);
    } catch (err) {
      if (err instanceof InvalidCredentialError) {
        throw new UnauthorizedException({
          message: 'invalid credentials',
        });
      } else if (err instanceof NotFoundAccountError) {
        throw new NotFoundException({
          message: "User isn't registered",
        });
      } else {
        throw err;
      }
    }

    return token;
  }

  @Post('signup')
  @ApiConflictResponse({
    description: 'User already exists',
    type: HttpExceptionResponseDTO,
  })
  async signup(
    @Body(new JoiValidationPipe(SignupRequestSchema))
    req: SignupRequest,
  ): Promise<AccessTokenResponse> {
    let token: AccessTokenResponse;

    try {
      token = await this.authService.signup({
        ...req,
        username: req.name,
      });
    } catch (err) {
      if (err instanceof AlreadyExistsAccountError) {
        throw new ConflictException({
          message: 'Already exists user',
        });
      } else {
        throw err;
      }
    }

    return token;
  }
}
