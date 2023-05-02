import { JwtCustomStrategy } from './jwt-custom.strategy';

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'LOijtrkljdklsufidsui12jkj43k21l4',
      signOptions: { expiresIn: '1d', algorithm: 'HS512' },
    }),

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthService, JwtCustomStrategy, PrismaService],
  controllers: [AuthController],
  exports: [PassportModule, JwtCustomStrategy],
})
export class AuthModule {}
