import { PrismaService } from './../prisma.service';
import { JwtCustomStrategy } from './jwt-custom.strategy';
import { RegsiterUserDto } from './../DTO/registerUserDto';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private jwtCustomStrategy: JwtCustomStrategy,
    private prisma: PrismaService,
  ) {}

  async registerUser(regsiterUserDto: RegsiterUserDto) {
    const { name, email, password } = regsiterUserDto;

    const emailverify = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (emailverify) {
      throw new InternalServerErrorException('E-mail already registered');
    }
    const hashed = await bcrypt.hashSync(password, 10);
    const salt = await bcrypt.getSalt(hashed);

    const user = {
      email,
      name,
      hashed,
      salt,
    };

    try {
      await this.prisma.users.create({
        data: {
          email,
          name,
          password: hashed,
          salt,
        },
      });
      return { ...user, password: undefined, salt: undefined };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong,user was not created.',
      );
    }
  }

  async teste(email) {
    const user = await this.prisma.users.findFirst({ where: { email } });
    console.log(user);
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    const payload = { name: user.name, email: user.email, id: user.id };

    if (isPasswordMatch) {
      const jwtToken = await this.jwt.signAsync(
        { payload },
        { expiresIn: '1d', algorithm: 'HS512' },
      );

      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
  async verifyToken(user) {
    return user;
  }
}
