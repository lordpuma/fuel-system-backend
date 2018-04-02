'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    count: {
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
  tickets.associate = models => {
    tickets.Premise = tickets.belongsTo(models['premise']);
    tickets.CreatedBy = tickets.belongsTo(models['user'], {
      sourceKey: 'createdBy',
    });
  };
  return tickets;
};
