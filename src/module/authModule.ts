import { Module } from '@nestjs/common';
import { AuthController } from '@/web/api/auth/authController';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
