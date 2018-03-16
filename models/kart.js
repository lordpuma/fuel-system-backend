'use strict';
module.exports = (sequelize, DataTypes) => {
  const kart = sequelize.define('kart', {
    number: DataTypes.INTEGER,
  });
  kart.associate = (models) => {
    kart.GasFillups = kart.hasMany(models['gas-fillup']);
  };
  return kart;
};