'use strict';
module.exports = (sequelize, DataTypes) => {
    const gasPurchase = sequelize.define('gas-purchase', {
        price: DataTypes.INTEGER,
        liters: DataTypes.INTEGER,
        date: DataTypes.DATE,
    });
    gasPurchase.associate = (models) => {
  };
  return gasPurchase;
};