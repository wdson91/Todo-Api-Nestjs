/* eslint-disable prettier/prettier */

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';


export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'LOijtrkljdklsufidsui12jkj43k21l4',
    });
  }

  async validate(Payload: { email: string }) {
    const { email } = Payload;

    const user = await this.repo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
