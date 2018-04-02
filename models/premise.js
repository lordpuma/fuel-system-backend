'use strict';
module.exports = (sequelize, DataTypes) => {
  const premise = sequelize.define('premise', {
    name: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
  return premise;
};
