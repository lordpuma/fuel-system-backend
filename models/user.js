'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    user.associate = (models) => {
        user.Tokens = user.hasMany(models.token);
        user.Roles = user.belongsToMany(models.role, {through:  'UserRoles'});
  };
  return user;
};