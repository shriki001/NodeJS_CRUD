const { SellerProduct } = require("../../db_init");
const { Op } = require("sequelize");
const { StatusCodes } = require("express-http-status");

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
  const { ASIN, Locale, page } = req.query;
  const _page = parseInt(page || "0");

  const query = { where: { [Op.and]: [{ ASIN, Locale }] } };
  const total = await SellerProduct.count(query);
  const data = await SellerProduct.findAll({
    ...query,
    offset: _page,
    limit: LIMIT,
  });
  return res.send({ page: _page, data, total, limit: LIMIT, total });
};
module.exports.update = async (req, res) => {};
module.exports.delete = async (req, res) => {
  const { ASIN, Locale } = req.query;
  const query = { where: { [Op.and]: [{ ASIN, Locale }] } };
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
  const total = await SellerProduct.count(query);
  const data = await SellerProduct.findAll({
    ...query,
    offset: _page,
    limit: LIMIT,
  });
  return res.send({ page: _page, data, total, limit: LIMIT, total });
};
module.exports.getAnalysis = async (req, res) => {};
