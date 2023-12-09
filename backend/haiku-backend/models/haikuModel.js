const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Haiku = sequelize.define('Haiku', {
  haiku: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});

module.exports = Haiku;
