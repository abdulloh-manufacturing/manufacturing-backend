import { Injectable } from '@nestjs/common';
import * as knex from 'knex';
import { QueryBuilder } from 'knex';

@Injectable()
export class KnexService {
  instance: any | QueryBuilder;

  constructor() {
    this.instance = knex({
      client: 'postgresql',
      debug: false,
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT),
      },
      pool: {
        min: 1,
        max: Number(process.env.MAX_POOL) || 75,
      },
    });
  }
}
