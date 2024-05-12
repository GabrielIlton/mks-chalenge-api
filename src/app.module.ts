import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter';

import { MovieController } from './modules/movies/movie.controller';
import { AccountModule } from './modules/account/account.module';
import { MovieModule } from './modules/movies/movie.module';
import { AuthModule } from './modules/auth/auth.module';
import { DbModule } from './infra/database.module';

import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    MovieModule,
    AuthModule,
    DbModule,
    CacheModule.registerAsync({
      useFactory: async () => ({ store: await redisStore({ ttl: 10 * 1000 }) }),
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // .exclude({ path: 'accounts', method: RequestMethod.POST })
      .forRoutes(MovieController);
  }
}
