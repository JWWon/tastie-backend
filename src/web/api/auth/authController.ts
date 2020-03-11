import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  Get,
  Query,
} from '@nestjs/common';
import {
  AccessTokenRequest,
  AccessTokenResponse,
  SignupRequest,
  QueryExistsAccountRequest,
  AuthCodeRequest,
} from './dto';
import {
  AccessTokenRequestSchema,
  SignupRequestSchema,
  QueryExistsAccountExistsSchema,
  AuthCodeRequestSchema,
} from './schema';
import { HttpExceptionResponseDTO } from '../common/response';
import { JoiValidationPipe } from '@/web/validation';
import { AuthService } from '@/domain/auth';
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
  @ApiCreatedResponse({
    description: 'Sign up',
    type: AccessTokenResponse,
  })
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
      if (err instanceof InvalidCredentialError) {
        throw new UnauthorizedException({
          message: 'invalid credentials',
        });
      } else if (err instanceof AlreadyExistsAccountError) {
        throw new ConflictException({
          message: 'Already exists user',
        });
      } else {
        throw err;
      }
    }

    return token;
  }

  @Get('accounts')
  @ApiOkResponse({ description: 'User is not exists' })
  @ApiConflictResponse({
    description: 'User already exists',
    type: HttpExceptionResponseDTO,
  })
  async existsAccount(
    @Query(new JoiValidationPipe(QueryExistsAccountExistsSchema))
    req: QueryExistsAccountRequest,
  ): Promise<void> {
    const exists = await this.authService.hasEmailAccountByEmail(req.email);
    if (exists) {
      throw new ConflictException({
        message: 'Already exists user',
      });
    }
  }

  @Get('code')
  @ApiOkResponse({ description: 'ok' })
  async getAuthCode(
    @Query(new JoiValidationPipe(AuthCodeRequestSchema))
    req: AuthCodeRequest,
  ): Promise<void> {}
}
