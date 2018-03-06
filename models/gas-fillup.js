'use strict';
module.exports = (sequelize, DataTypes) => {
    const gasFillup = sequelize.define('gas-fillup', {
        liters: DataTypes.INTEGER,
        kart: DataTypes.INTEGER,
        date: DataTypes.DATE,
    });
    gasFillup.associate = (models) => {
  };
  return gasFillup;
};