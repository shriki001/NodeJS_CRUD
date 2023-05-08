const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.SellerProduct = require("./app/models/seller_product.module")(sequelize, Sequelize);

module.exports = db;
