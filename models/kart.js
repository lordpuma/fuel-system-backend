'use strict';
module.exports = (sequelize, DataTypes) => {
  const kart = sequelize.define('kart', {
    number: DataTypes.INTEGER,
  }, {
    paranoid: true,
  });
  kart.associate = (models) => {
    kart.GasFillups = kart.hasMany(models['gas-fillup']);
  };
  return kart;
};