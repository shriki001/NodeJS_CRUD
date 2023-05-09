# NodeJS_CRUD

# How to use?
* npm install
* npm start for node
* npm start:dev for nodemon

the database will automatically create (sqlite3)

# This project includes:
*CREATE*
POST {{url}}/api/v1/create
body: {
    "asin":"scads2",
    "locale":"US",
    "seller_name":"test2",
    "price":6,
    "availability": true
}

*READ*
GET {{url}}/api/v1/read?asin=scads2&locale=US

*UPDATE*
PUT {{url}}/api/v1/update?asin=scads2&locale=US
body: {
    "seller_name":"test2",
    "price":44,
    "availability": true
}

*DELETE*
DELETE {{url}}/api/v1/delete?asin=scads2&locale=US

*READ_BY_SELLER*
GET {{url}}/api/v1/readBySeller/test2

*GET_ANALISYS*
GET {{url}}/api/v1/getAnalysis

*UPLOAD*
PUT {{url}}/api/v1/upload
body: {
    "file_path":"/home/michael/Downloads/seller_products.csv"
}
