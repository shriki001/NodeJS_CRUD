const SellerProductRoute = require("express").Router();

SellerProductRoute.get('/', (req, res)=>{
    res.send('Hello!!!!!!!!')
})

module.exports = SellerProductRoute;