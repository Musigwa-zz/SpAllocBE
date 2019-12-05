'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING
  }, { tableName: "users", timestamps: true, paranoid: true });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};