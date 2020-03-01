import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBearerAuth,
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
  UseGuards,
} from '@nestjs/common';
import { User } from '@/entities';
import { UserDecorator } from '@/web/decorator';
import { JwtAuthGuard } from '@/web/guard';
import { UserService } from '@/domain/user';
import { UserResponse } from './dto';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'ok', type: UserResponse })
  async me(@UserDecorator() me: User): Promise<UserResponse> {
    const user = await this.userService.getUserByUserID(me.id);
    return user;
  }
}
