const { Sequelize } = require('sequelize');
require('dotenv').config();

// If DATABASE_URL is set, use it for connection
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false, // Disable logging or set to true to enable
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // This may be necessary for self-signed certificates
        }
      }
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
      logging: false, // Disable logging or set to true to enable
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
          require: true,
          rejectUnauthorized: false // This may be necessary for self-signed certificates
        } : false
      }
    });

module.exports = sequelize;
