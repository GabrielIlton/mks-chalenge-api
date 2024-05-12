import { Module } from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';

@Module({
  providers: [AuthMiddleware],
})
export class MiddlewareModule {}
