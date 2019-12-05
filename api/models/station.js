'use strict';
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    deskID: DataTypes.STRING,
  }, {
    tableName: 'stations', timestamps: true, paranoid: true,
    hooks: {},
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    },
  });

  Station.associate = function (models) { };
  Station.prototype.privatize = function (blackList = []) {
    const defaults = ['deletedAt']
    return _.omit(this.dataValues, typeof blackList === 'object'
      ? defaults.concat(blackList) : blackList
    );
  }
  return Station;
};
