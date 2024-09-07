const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Like = sequelize.define("like", {
  haikuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Haiku,
      key: "id",
    },
  },
  visitorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Like;
