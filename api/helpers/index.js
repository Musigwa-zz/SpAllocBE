const debug = require('debug');
const startupDebug = debug('app:startup');
const databaseDebug = debug('app:db');
const models = require('../models');
const constants = require('../helpers/constants');

/**
 * @description This is a class of static helper methods to perform various logic
 * @author MUSIGWA Pacifique
 * @class Helpers
 */
class Helpers {
  /**
   * @description This helps verifying the database connection
   * @author MUSIGWA Pacifique
   * @static
   * @return {void}
   * @memberof Helpers
   */
  static async dbConnect() {
    const { sequelize } = models;
    try {
      await sequelize.authenticate();
      // await sequelize.sync();
      startupDebug(`Listening on port ${constants.PORT}`);
      databaseDebug('DB connection established');
    } catch (error) {
      databaseDebug('Unable to connect to the DB');
      process.exit(1);
    }
  }
}

module.exports = Helpers;