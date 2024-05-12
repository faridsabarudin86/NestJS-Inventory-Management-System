import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  async validate(payload: any) {
    return {
      uuid: payload.uuid,
      emailAddress: payload.emailAddress,
      corporateUuid: payload.corporateUuid,
      roles: payload.roles,
    };
  }
}
