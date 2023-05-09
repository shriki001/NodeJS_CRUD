module.exports = (sequelize, Sequelize) => {
  const SellerProduct = sequelize.define(
    "seller_product",
    {
      asin: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      locale: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      seller_name: {
        type: Sequelize.STRING,
      },
      availability: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_link: {
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["asin", "locale"],
        },
      ],
    }
  );

  return SellerProduct;
};
