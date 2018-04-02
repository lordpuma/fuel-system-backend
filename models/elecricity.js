'use strict';
module.exports = (sequelize, DataTypes) => {
  const electricity = sequelize.define('electricity', {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
      allowNull: false,
    },
    meter1: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    meter2: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
  electricity.associate = models => {
    electricity.CreatedBy = electricity.belongsTo(models['user'], {
      sourceKey: 'createdBy',
    });
  };
  return electricity;
};
