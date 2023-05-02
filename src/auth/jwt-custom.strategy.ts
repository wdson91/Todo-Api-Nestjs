import { PrismaService } from 'src/prisma.service';
/* eslint-disable prettier/prettier */

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UnauthorizedException } from '@nestjs/common';


export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
     
    public prisma:PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'LOijtrkljdklsufidsui12jkj43k21l4',
    });
  }

  async validate(Payload: { payload: { id: any; }; }) {
    
    const  id  = Payload.payload.id;
    
    //const user = await this.prisma.users.findFirst({ where: { email} });
    // console.log(user)
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return Payload.payload.id;
  }
}
