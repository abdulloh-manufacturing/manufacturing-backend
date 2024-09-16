import * as Knex from 'knex';
import ObjectID from 'bson-objectid';
import { InjectKnex } from 'nestjs-knex';
import { isEmpty } from 'lodash';

Knex.QueryBuilder.extend('paginateResponse', function (knex) {
  // WRAP WITH RAW
  return knex
    .select([knex.raw('t.total::integer'), knex.raw('json_agg(item) as list')])
    .from(this.as('t'))
    .groupBy('total')
    .first()
    .then((rows) => {
      // Return empty response
      return rows || { total: 0, list: [] };
    });
});

export interface IBaseQuery<T> {
  getById(id: string, columns?: string[]): Promise<T>;

  updateById(id: string, value: T): Promise<T[]>;

  insert(value: T, returning?: string[]): Promise<T>;

  insertWithTransaction(
    trx: Knex.Transaction,
    value: T,
    returning?: string[],
  ): Promise<T[]>;

  updateByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    value: T,
  ): Promise<T[]>;

  getByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    columns?: string[],
  ): Promise<T>;
}

export class BaseRepo<T> implements IBaseQuery<T> {
  @InjectKnex() knex;

  get tableName(): string {
    return this._tableName;
  }

  constructor(private _tableName: string) {}

  generateRecordId() {
    return new ObjectID().toString();
  }

  getAll(where, columns = ['*']) {
    let query = this.knex.select(columns).from(this._tableName);

    if (where) {
      query.where(where);
    }

    return query;
  }

  getById(id: string, columns = ['*']): Promise<T> {
    return this.knex
      .select(columns)
      .from(this._tableName)
      .where('id', id)
      .first();
  }

  async updateById(id: string, value: T, returning = ['*']): Promise<T[]> {
    const [data] = await this.knex(this._tableName)
      .update(value)
      .where('id', id)
      .returning(returning);
    return data;
  }

  updateByColumn(
    column = 'id',
    id: string,
    value: T,
    returning = ['*'],
  ): Promise<T[]> {
    return this.knex(this._tableName)
      .update(value)
      .where(column, id)
      .returning(returning);
  }

  async insert(value: T, returning = ['*']): Promise<T> {
    const query = this.knex
      .insert({ ...value })
      .into(this._tableName)
      .returning(returning);

    const [data] = await query;
    return data;
  }

  insertWithTransaction(
    trx: Knex.Transaction | Knex,
    value: T | T[],
    returning = ['*'],
  ) {
    let queryBuilder = trx
      .insert(value)
      .into(this._tableName)
      .returning(returning);
    return queryBuilder.then((data) => (data.length === 1 ? data[0] : data));
  }

  async updateByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    value: T,
    returning = ['*'],
  ) {
    const [data] = await trx
      .update(value)
      .from(this._tableName)
      .where('id', id)
      .returning(returning);
    return data;
  }

  async updateByUniqueCodeWithTransaction(
    trx: Knex.Transaction,
    unique_code: string,
    value: T,
    returning = ['*'],
  ) {
    const [data] = await trx
      .update(value)
      .from(this._tableName)
      .where('unique_code', unique_code)
      .returning(returning);
    return data;
  }

  getByIdWithTransaction(
    trx: Knex.Transaction,
    id: string,
    columns = ['*'],
  ): Promise<T> {
    return trx.select(columns).from(this._tableName).where('id', id).first();
  }

  getByUniqueCodeWithTransaction(
    trx: Knex.Transaction,
    unique_code: string,
    columns = ['*'],
  ): Promise<T> {
    return trx
      .select(columns)
      .from(this._tableName)
      .where('unique_code', unique_code)
      .whereRaw('is_deleted is not true')
      .first();
  }

  async delete(whereMap, returning = ['*'], trx?) {
    const client = trx ? trx : this.knex;
    const [data] = await client
      .from(this._tableName)
      .where(whereMap)
      .del()
      .returning(returning);
    return data;
  }
}
