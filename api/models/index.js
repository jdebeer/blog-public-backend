const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = {};
const basename = path.basename(__filename);

console.log('creating sequelize connection', process.env.DATABASE_URL);

console.log('using ssl?', (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') && !process.env.NO_SSL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') && !process.env.NO_SSL
      ? {
        require: true,
        rejectUnauthorized: false,
      }
      : false,
  },
});

(async () => {
  try {
    console.log('Authenticating sequelize connection');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
