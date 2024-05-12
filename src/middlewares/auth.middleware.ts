import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import environments from 'src/config/environments';
import Errors from 'src/common/HTTP/Errors';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        const error = Errors.generic.notFound({
          entity: 'token',
        });

        return response.status(error.getStatus()).json(error.getResponse());
      }

      await jwt.verify(token, environments.SECRET_JWT ?? '');

      return next();
    } catch (exception) {
      const error = Errors.generic.invalidField({
        fieldKey: 'token',
      });

      return response.status(error.getStatus()).json(error.getResponse());
    }
  }
}
