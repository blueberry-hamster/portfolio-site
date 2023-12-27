const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Haiku = sequelize.define('Haiku', {
  haiku: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at', // Map to the "created_at" column in the table
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at', // Map to the "updated_at" column in the table
  },
}, {
  tableName: 'haikus', // Specify the table name explicitly
});

module.exports = Haiku;
