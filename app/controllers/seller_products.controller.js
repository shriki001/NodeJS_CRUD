const { SellerProduct } = require("../../db_init");
const { Op, fn, col } = require("sequelize");
const { StatusCodes } = require("express-http-status");
const { createReadStream } = require("fs");
const csv = require("csv-parser");

const LIMIT = 25;

module.exports.create = async (req, res) => {
  SellerProduct.create(req.body)
    .then((_) => {
      return res.send("product created!");
    })
    .catch((error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    });
};

module.exports.read = async (req, res) => {
  const { asin, locale, page } = req.query;
  const _page = parseInt(page || "0");

  const query = { where: { [Op.and]: [{ asin, locale }] } };
  const { count, rows } = await SellerProduct.findAndCountAll({
    ...query,
    offset: _page,
    limit: LIMIT,
  });
  if (!rows.length) return res.sendStatus(StatusCodes.NOT_FOUND);
  return res.send({ page: _page, data: rows, limit: LIMIT, total: count });
};

module.exports.update = async (req, res) => {
  const { asin, locale } = req.query;
  const findQuery = { where: { [Op.and]: [{ asin, locale }] } };
  SellerProduct.update(req.body, findQuery)
    .then((count) => res.status(StatusCodes.OK).send({ count }))
    .catch((err) =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
    );
};

module.exports.delete = async (req, res) => {
  const { asin, locale } = req.query;
  const query = { where: { [Op.and]: [{ asin, locale }] } };
  SellerProduct.destroy(query)
    .then((count) => res.status(StatusCodes.OK).send({ count }))
    .catch((err) =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
    );
};

module.exports.readBySeller = async (req, res) => {
  const { seller_name } = req.params;
  const _page = parseInt(req.query.page || "0");
  if (!seller_name || !seller_name.trim().length)
    return res.sendStatus(StatusCodes.NOT_FOUND);
  const query = { where: { seller_name } };
  const { count, rows } = await SellerProduct.findAndCountAll({
    ...query,
    offset: _page,
    limit: LIMIT,
  });
  return res.send({ page: _page, data: rows, limit: LIMIT, total: count });
};

function _findData(_fn, _col, outRowName, where) {
  return SellerProduct.findAll({
    attributes: ["seller_name", "locale", [fn(_fn, col(_col)), outRowName]],
    where,
    group: ["seller_name", "locale"],
    raw: true,
  });
}

module.exports.getAnalysis = async (req, res) => {
  const [availableProducts, unavailableProducts, avgPricePerSellerlocale] =
    await Promise.all([
      _findData("COUNT", "availability", "available_products", {
        availability: true,
      }),
      _findData("COUNT", "availability", "unavailable_products", {
        availability: false,
      }),
      _findData("AVG", "price", "average_price"),
    ]);
  const returnData = [];

  for (const sellerlocale of avgPricePerSellerlocale) {
    const { seller_name, locale, average_price } = sellerlocale;
    const { available_products } =
      availableProducts.find(
        (sellerLo) =>
          sellerLo.seller_name === seller_name && sellerLo.locale === locale
      ) || 0;
    const { unavailable_products } =
      unavailableProducts.find(
        (sellerLo) =>
          sellerLo.seller_name === seller_name && sellerLo.locale === locale
      ) || 0;
    returnData.push({
      seller_name,
      locale,
      available_products,
      unavailable_products,
      average_price,
    });
  }
  return res.send(returnData);
};

module.exports.csvHandle = async (req, res) => {
  const { file_path } = req.body;
  const results = [];
  try {
    createReadStream(file_path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        SellerProduct.bulkCreate(results, {
          updateOnDuplicate: [
            "seller_name",
            "availability",
            "price",
            "product_name",
            "product_link",
          ],
        })
        .catch(err=>console.error(err));
      });
  } catch (error) {
    console.error(error);
  }
  return res.sendStatus(StatusCodes.ACCEPTED);
};
