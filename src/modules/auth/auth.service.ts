import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AccountService } from '../account/account.service';
import Errors from 'src/common/HTTP/Errors';
import environments from 'src/config/environments';

export interface AccountPayload {
  accountId?: string;
  accountName?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const account = await this.accountService.findByEmail(email);
    if (!account) throw Errors.generic.notFound({ entity: 'conta' });

    const payloadIsValid = await bcrypt.compare(password, account?.password);
    if (!payloadIsValid)
      throw Errors.generic.invalidField({ fieldKey: 'email ou a senha' });

    const payload: AccountPayload = {
      accountId: account?.id,
      accountName: account?.name,
    };

    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: environments.EXPIRE_JWT,
        secret: environments.SECRET_JWT,
      }),
    };
  }
}
