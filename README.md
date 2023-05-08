# NodeJS_CRUD

# How to use?
* npm install
* npm start

the database will automatically create (sqlite3)

# This project includes:
*CREATE*
POST {{url}}/api/v1/create
body: {
    "ASIN":"scads2",
    "Locale":"US",
    "seller_name":"test2",
    "price":6,
    "availability": true
}

*READ*
GET {{url}}/api/v1/read?ASIN=scads2&Locale=US

*UPDATE*
PUT {{url}}/api/v1/update?ASIN=scads2&Locale=US
body: {
    "seller_name":"test2",
    "price":44,
    "availability": true
}

*DELETE*
DELETE {{url}}/api/v1/delete?ASIN=scads2&Locale=US

*READ_BY_SELLER*
GET {{url}}/api/v1/readBySeller/test2

*GET_ANALISYS*
GET {{url}}/api/v1/getAnalysis

*UPLOAD*
PUT {{url}}/api/v1/upload
body: {
    "file_path":"/home/michael/Downloads/seller_products.csv"
}
