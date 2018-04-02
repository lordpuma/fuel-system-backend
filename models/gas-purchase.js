'use strict';
module.exports = (sequelize, DataTypes) => {
  const gasPurchase = sequelize.define('gas-purchase', {
    price: DataTypes.INTEGER,
    liters: DataTypes.INTEGER,
    date: DataTypes.DATE,
  });
  gasPurchase.associate = models => {
    gasPurchase.CreatedBy = gasPurchase.belongsTo(models['user'], {
      sourceKey: 'createdBy',
    });
  };
  return gasPurchase;
};
