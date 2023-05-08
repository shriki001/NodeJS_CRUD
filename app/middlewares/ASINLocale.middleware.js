const { StatusCodes } = require("express-http-status");

module.exports.requireASINLocale = async (req, res, next) => {
  const { ASIN, Locale } = req.query;
  if (!ASIN || !Locale)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("ASIN OR Local or provided!");
  next();
};
