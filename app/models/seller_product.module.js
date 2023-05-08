module.exports = (sequelize, Sequelize) => {
  const SellerProduct = sequelize.define(
    "seller_product",
    {
      ASIN: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Locale: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      availability: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        type: Sequelize.FLOAT,
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
          fields: ["ASIN", "Locale"],
        },
      ],
    }
  );

  return SellerProduct;
};
