import { JwtCustomStrategy } from './jwt-custom.strategy';
import { RegsiterUserDto } from './../DTO/registerUserDto';
import { UserEntity } from './../Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.decorator';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
    private jwtCustomStrategy: JwtCustomStrategy,
  ) {}

  async registerUser(regsiterUserDto: RegsiterUserDto) {
    const { name, email, password } = regsiterUserDto;
    console.log(regsiterUserDto);
    const emailverify = await this.repo.findOne({
      where: {
        email,
      },
    });
    if (emailverify) {
      throw new InternalServerErrorException('E-mail already registered');
    }
    const hashed = await bcrypt.hashSync(password, 10);
    const salt = await bcrypt.getSalt(hashed);

    const user = new UserEntity();

    user.email = email;
    user.name = name;
    user.password = hashed;
    user.salt = salt;

    this.repo.create(user);
    try {
      await this.repo.save(user);
      return { ...user, password: undefined, salt: undefined };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong,user was not created.',
      );
    }
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    const user = await this.repo.findOne({
      where: {
        email,
      },
    });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const jwtToken = await this.jwt.signAsync(
        { email },
        { expiresIn: '1d', algorithm: 'HS512' },
      );

      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
