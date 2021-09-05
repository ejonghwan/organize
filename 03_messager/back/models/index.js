// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });


//연결하는데 위에껀 기본값 아래껀 커스텀한거
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || "development";
const config = require('../config/config')[env];
const db = {};

// sequelize로 node mysql 연결
const sequelize = new Sequelize(config.database, config.username, config.password, config)


//불러오기
db.Comment = require('./comment')(sequelize, Sequelize) //require로 코멘트 함수실행
db.Hashtag = require('./hashtag')(sequelize, Sequelize)
db.Image = require('./image')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize) 
db.User = require('./user')(sequelize, Sequelize) 


// 각 파일마다 db. 이런애들을 찾아서 다 등록해줌
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
