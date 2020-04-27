module.exports = {
  development: {
    username: process.env.MYSQL_USER_INSERT,
    password: process.env.MYSQL_USER_INSERT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'db',
    dialect: 'mysql',
    timezone: 'America/New_York',
  },
  test: {
    username: process.env.MYSQL_USER_INSERT,
    password: process.env.MYSQL_USER_INSERT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'db',
    dialect: 'mysql',
    timezone: 'America/New_York',
  },
  production: {
    username: process.env.MYSQL_USER_INSERT,
    password: process.env.MYSQL_USER_INSERT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'db',
    dialect: 'mysql',
    timezone: 'America/New_York',
  },
}
