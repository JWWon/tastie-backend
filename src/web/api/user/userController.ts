import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  Controller,
  Post,
  Body,
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
import { UserService, NotFoundUserPlaceLikeError } from '@/domain/user';
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
    @UserDecorator() me: User,
    @Body() req: CreateUserPlaceLikeRequest,
  ): Promise<void> {
    try {
      await this.userService.createUserPlaceLike({
        userID: me.id,
        placeID: req.placeID,
        positive: req.positive,
      });
    } catch (err) {
      if (err instanceof NotFoundUserPlaceLikeError) {
        throw new NotFoundException({
          message: 'Like is not exists',
        });
      } else {
        throw err;
      }
    }
  }

  @Delete('likes')
  @ApiOkResponse({ description: 'ok' })
  @ApiNotFoundResponse({ description: 'row is not found' })
  async removePlaceLike(
    @UserDecorator() me: User,
    @Query('place_id') placeID: string,
  ): Promise<void> {
    try {
      await this.userService.removeUserPlaceLike(me.id, placeID);
    } catch (err) {
      if (err instanceof NotFoundUserPlaceLikeError) {
        throw new NotFoundException({
          message: 'Like is not exists',
        });
      } else {
        throw err;
      }
    }
  }
}
