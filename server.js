const express = require("express");
const helmet = require("helmet");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./db_init");

// sync db
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db done");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/api/v1", require("./app/routes/seller_product.rout"));
// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
