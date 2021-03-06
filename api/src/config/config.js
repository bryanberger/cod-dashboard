module.exports = {
  development: {
    username: process.env.MYSQL_USER_INSERT,
    password: process.env.MYSQL_USER_INSERT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'db',
    dialect: 'mysql',
    timezone: '+00:00',
  },
  test: {
    username: process.env.MYSQL_USER_INSERT,
    password: process.env.MYSQL_USER_INSERT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'db',
    dialect: 'mysql',
    timezone: '+00:00',
  },
  production: {
    username: process.env.MYSQL_USER_INSERT,
    password: process.env.MYSQL_USER_INSERT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'db',
    dialect: 'mysql',
    timezone: '+00:00',
    logging: false,
  },
}
