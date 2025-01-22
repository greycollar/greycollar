const platform = require("@nucleoidai/platform-express");
const {
  Postgres: { sequelize },
} = platform.module();
const { DataTypes, UUIDV4 } = platform.require("sequelize");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commandId: {
    type: DataTypes.UUID,
    references: {
      model: "Command",
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    default: "IN_PROGRESS",
    validate: {
      isIn: [["IN_PROGRESS", "DONE"]],
    },
  },
  colleagueId: {
    type: DataTypes.UUID,
    references: {
      model: "Colleague",
      key: "id",
    },
  },
});

module.exports = Task;
