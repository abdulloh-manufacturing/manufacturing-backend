import { HttpModule } from '@nestjs/axios';

require('dotenv').config();
import { KnexModule } from 'nestjs-knex';
import { Module } from '@nestjs/common';

import { KnexService } from './providers/knex-service';

import { JwtModule } from '@nestjs/jwt';
import { CustomRedisService } from '@shared/providers/redis-service';
import { RedisModule } from 'nestjs-redis';
import { ConfigService } from '@shared/providers/config.service';

const repos = [];

const KnexConfig: {
  development: any;
  staging: any;
  production: any;
} = require("../../knexfile");

const modules = [
  HttpModule,
  KnexModule.forRoot({
    config: (process.env.NODE_ENV === 'development')
      ? KnexConfig.development
      : KnexConfig.production,
  }),
];

const providers: any = [
  ConfigService,
  KnexService,
];

if (process.env.isJWT === 'ON') {
  modules.push(
    JwtModule.register({
      secret: process.env.SECRETKEY || 'super-cat',
      signOptions: {
        expiresIn: process.env.EXPIRESIN || '6 hours',
      },
    })
  );
}

if (process.env.isRedis === 'ON') {
  modules.push(
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    }),
  );

  providers.push(
    CustomRedisService,
  );
}



@Module({
  imports: [...modules],
  providers: [...repos, ...providers],
  exports: [...modules, ...repos, ...providers],
})
export class SharedModule {}

