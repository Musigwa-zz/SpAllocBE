const config = require('config');

module.exports = {
  username: config.get('database.user'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  dialect: 'postgres',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // use_env_variable: config.has('database.url')
  //   && config.get('database.url')
};
