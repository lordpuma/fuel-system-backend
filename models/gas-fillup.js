'use strict';
module.exports = (sequelize, DataTypes) => {
  const gasFillup = sequelize.define('gas-fillup', {
    liters: DataTypes.INTEGER,
    date: DataTypes.DATE,
  });
  gasFillup.associate = models => {
    gasFillup.Kart = gasFillup.belongsTo(models.kart);
    gasFillup.CreatedBy = gasFillup.belongsTo(models['user'], {
      sourceKey: 'createdBy',
    });
  };
  return gasFillup;
};
