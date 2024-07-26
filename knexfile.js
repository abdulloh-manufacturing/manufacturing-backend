// Update with your config settings.
require('dotenv').config()
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
  development: {
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
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations' // change this line correctly if the knex configuration is moved to another folder
    }
  },

  staging: {
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
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations' // change this line correctly if the knex configuration is moved to another folder
    }
  },

  production: {
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
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations' // change this line correctly if the knex configuration is moved to another folder
    }
  }

};
