'use strict';
module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        name: DataTypes.STRING,
    });
    role.associate = (models) => {
        role.Users = role.belongsToMany(models.user, {through:  'UserRoles'});
  };
  return role;
};