import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { AccountPayload } from './auth.service';
import Errors from 'src/common/HTTP/Errors';

export interface RequestWithAccount extends Request {
  account: AccountPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<RequestWithAccount>();

      const [, token] = request.headers.authorization?.split(' ') ?? [];
      if (!token) throw Errors.generic.missingParamError({ fieldKey: 'token' });

      const payload: AccountPayload = await this.jwtService.verifyAsync(token);

      request.account = payload;

      return true;
    } catch (error) {
      throw Errors.generic.invalidField({ fieldKey: 'JWT' });
    }
  }
}
