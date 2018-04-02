'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  user.associate = models => {
    user.Tokens = user.hasMany(models.token);
    user.CreatedKartHours = user.hasMany(models['kart-hours'], {
      foreignKey: 'createdBy',
    });
    user.CreatedGasFillups = user.hasMany(models['gas-fillup'], {
      foreignKey: 'createdBy',
    });
    user.CreatedGasPurchases = user.hasMany(models['gas-purchase'], {
      foreignKey: 'createdBy',
    });
    user.CreatedTickets = user.hasMany(models['tickets'], {
      foreignKey: 'createdBy',
    });
    user.CreatedElectricities = user.hasMany(models['electricity'], {
      foreignKey: 'createdBy',
    });
    user.Roles = user.belongsToMany(models.role, { through: 'UserRoles' });
  };
  return user;
};
