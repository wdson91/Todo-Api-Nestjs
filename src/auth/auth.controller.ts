import { PrismaService } from './../prisma.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { Post, Body, UseGuards } from '@nestjs/common/decorators';
import { RegsiterUserDto } from 'src/DTO/registerUserDto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

import { User } from './user.decorator';

import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a register' })
  registration(@Body() registerDto: RegsiterUserDto) {
    return this.authService.registerUser(registerDto);
  }
  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password to receive jwt token',
  })
  signin(@Body(ValidationPipe) loginDto: UserLoginDto) {
    return this.authService.loginUser(loginDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('verifyToken')
  verifyToken(@User() user: any) {
    return user;
  }
}
