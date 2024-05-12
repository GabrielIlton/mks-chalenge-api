import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import environments from 'src/config/environments';

@Injectable()
export class HashPipe implements PipeTransform {
  async transform(password: string) {
    const salt = environments.SALT_PASSWORD;

    return bcrypt.hash(password, Number(salt));
  }
}
