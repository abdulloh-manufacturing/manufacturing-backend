import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CustomRedisService {
  _client: Redis;

  constructor(redisService: RedisService) {
    this._client = redisService.getClient();
  }

  get client() {
    return this._client;
  }

  set(key, value, ttl?, mode?) {
    if (ttl) {
      return this.client.set(key, value, mode || 'ex', ttl);
    }

    return this.client.set(key, value);
  }

  del(key) {
    return this.client.del(key);
  }

  async get(value) {
    try {
      const data = await this.client.get(value);
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
