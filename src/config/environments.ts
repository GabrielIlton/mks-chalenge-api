import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export default {
  PORT: Number(process.env.PORT),

  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,

  SALT_PASSWORD: process.env.SALT_PASSWORD ?? 5,

  SECRET_JWT: process.env.SECRET_JWT,
  EXPIRE_JWT: process.env.EXPIRE_JWT,
};
