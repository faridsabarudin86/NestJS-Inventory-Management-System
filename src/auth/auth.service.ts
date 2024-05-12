import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersFunctions } from 'src/users/users.functions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersFunctions: UsersFunctions,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailAddress: string, password: string): Promise<any> {
    const userInfo = await this.usersFunctions.findOneUser({
      emailAddress: emailAddress,
    });

    const passwordMatch = await bcrypt.compare(
      password,
      userInfo.output.password,
    );
    if (userInfo.output && passwordMatch) {
      const { password, ...result } = userInfo.output;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      uuid: user._doc.uuid,
      emailAddress: user._doc.emailAddress,
      corporateUuid: user._doc.corporateUuid,
      roles: user._doc.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
