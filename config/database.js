const config = require('config');

module.exports = {
  username: config.get('database.user'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  dialect: 'postgres',
  logging: config.get('database.logging'),
  // use_env_variable: config.get('database.use_env_variable')
};
