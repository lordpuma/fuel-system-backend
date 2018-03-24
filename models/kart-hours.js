'use strict';
module.exports = (sequelize, DataTypes) => {
  const kartHour = sequelize.define('kart-hours', {
    hours: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
      allowNull: false,
    },
  });
  kartHour.associate = (models) => {
    kartHour.Kart = kartHour.belongsTo(models['kart']);
    kartHour.CreatedBy = kartHour.belongsTo(models['user'], {
      sourceKey: 'createdBy',
    });
  };
  return kartHour;
};