const SellerProductRoute = require("express").Router();
const SellerProductController = require("../controllers/seller_products.controller");
const { requireASINLocale } = require("../middlewares/ASINLocale.middleware");

SellerProductRoute.post("/create", SellerProductController.create);
SellerProductRoute.get(
  "/read",
  requireASINLocale,
  SellerProductController.read
);
SellerProductRoute.put(
  "/update",
  requireASINLocale,
  SellerProductController.update
);
SellerProductRoute.delete(
  "/delete",
  requireASINLocale,
  SellerProductController.delete
);
SellerProductRoute.get(
  "/readBySeller/:seller_name",
  SellerProductController.readBySeller
);

SellerProductRoute.get("/getAnalysis", SellerProductController.getAnalysis);
// to align the reqirements i sparete the api, basically I use the same path name and different http request
// example -> / with delete will delete, / with get will read, / with post will create
module.exports = SellerProductRoute;
