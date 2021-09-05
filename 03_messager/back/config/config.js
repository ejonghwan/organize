// json -> js로 바꾸고 module.exports 넣어줌 .env쓰려고. json은 못씀

const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "jme",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "jme",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "jme",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
