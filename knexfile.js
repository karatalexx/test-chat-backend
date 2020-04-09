require('dotenv').config({ path: __dirname + '/.env' });

const {
  DB_MYSQL_DEVELOPMENT_HOST,
  DB_MYSQL_DEVELOPMENT_PORT,
  DB_MYSQL_DEVELOPMENT_DATABASE,
  DB_MYSQL_DEVELOPMENT_USERNAME,
  DB_MYSQL_DEVELOPMENT_PASSWORD
} = process.env;

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: DB_MYSQL_DEVELOPMENT_HOST,
      port: DB_MYSQL_DEVELOPMENT_PORT,
      database: DB_MYSQL_DEVELOPMENT_DATABASE,
      user: DB_MYSQL_DEVELOPMENT_USERNAME,
      password: DB_MYSQL_DEVELOPMENT_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/src/app/database/migrations`,
      tableName: 'migrations'
    }
  }
};
