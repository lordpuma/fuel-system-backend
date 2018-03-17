'use strict';
module.exports = (sequelize, DataTypes) => {
  const kart = sequelize.define('kart', {
    number: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
  kart.associate = (models) => {
    kart.GasFillups = kart.hasMany(models['gas-fillup']);
    kart.KartHours = kart.hasMany(models['kart-hours']);
  };
  return kart;
};