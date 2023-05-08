const { StatusCodes } = require("express-http-status");

module.exports.requireASINLocale = async (req, res, next) => {
  const { asin, locale } = req.query;
  if (!asin || !locale)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("asin OR Local or provided!");
  next();
};
