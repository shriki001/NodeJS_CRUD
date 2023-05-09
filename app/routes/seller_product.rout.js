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

// local path can be /home/use/file.csv in get we can't do it so i need to do it via put and insert the path to the body
SellerProductRoute.put("/upload", SellerProductController.csvHandle);

// to align the requirements i separate the api, basically I use the same path name and different http request
// example -> / with delete will delete, / with get will read, / with post will create
module.exports = SellerProductRoute;
