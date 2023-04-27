import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common/decorators';
import { RegsiterUserDto } from 'src/DTO/registerUserDto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a register' })
  registration(@Body(ValidationPipe) registerDto: RegsiterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password to receive jwt token',
  })
  signin(@Body(ValidationPipe) loginDto: UserLoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
