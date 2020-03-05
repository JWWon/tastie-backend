import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
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
  Delete,
  Put,
} from '@nestjs/common';
import { User } from '@/entities';
import { UserDecorator } from '@/web/decorator';
import { JwtAuthGuard } from '@/web/guard';
import { UserService } from '@/domain/user';
import {
  UserResponse,
  UserPlaceLikeResponse,
  CreateUserPlaceLikeRequest,
} from './dto';

@ApiTags('User API')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOkResponse({ description: 'ok', type: UserResponse })
  async me(@UserDecorator() me: User): Promise<UserResponse> {
    const user = await this.userService.getUserByUserID(me.id);
    return user;
  }

  @Get('likes')
  @ApiOkResponse({
    description: 'ok',
    type: UserPlaceLikeResponse,
    isArray: true,
  })
  async getPlaceLikes(
    @UserDecorator() me: User,
  ): Promise<UserPlaceLikeResponse[]> {
    const likes = await this.userService.getUserPlaceLikes(me.id);
    return likes;
  }

  @Post('likes')
  @ApiCreatedResponse({ description: 'ok' })
  async createPlaceLike(
    @Body() req: CreateUserPlaceLikeRequest,
  ): Promise<void> {
    // try {
    //   await this.userService
    // }
  }

  @Put('likes')
  @ApiOkResponse({ description: 'ok' })
  @ApiNotFoundResponse({ description: 'row is not found' })
  async updatePlaceLike(
    @Body() req: CreateUserPlaceLikeRequest,
  ): Promise<void> {}

  @Delete('likes')
  @ApiNoContentResponse({ description: 'ok' })
  @ApiNotFoundResponse({ description: 'row is not found' })
  async removePlaceLike(@Query('place_id') placeID: string): Promise<void> {}
}
