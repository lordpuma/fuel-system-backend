'use strict';
module.exports = (sequelize, DataTypes) => {
    const token = sequelize.define('token', {
        token: DataTypes.STRING,
    });
    token.associate = (models) => {
    token.User = token.belongsTo(models.user);
  };
  return token;
};