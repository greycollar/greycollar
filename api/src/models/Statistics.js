const platform = require("@nucleoidai/platform-express");
const {
  Postgres: { sequelize },
} = platform.module();
const { DataTypes, UUIDV4 } = platform.require("sequelize");

const Statistics = sequelize.define("Statistics", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  responseRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supervisingRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  knowledgeSize: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  taskCount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalMessages: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Project",
      key: "id",
    },
  },
});

module.exports = Statistics;
