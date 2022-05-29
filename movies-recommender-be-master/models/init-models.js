var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _userGenrePreferences = require("./userGenrePreferences");
var _userHistory = require("./userHistory");
var _userLanguagePreferences = require("./userLanguagePreferences");
var _userSubscriptions = require("./userSubscriptions");
var _userTypes = require("./userTypes");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var userGenrePreferences = _userGenrePreferences(sequelize, DataTypes);
  var userHistory = _userHistory(sequelize, DataTypes);
  var userLanguagePreferences = _userLanguagePreferences(sequelize, DataTypes);
  var userSubscriptions = _userSubscriptions(sequelize, DataTypes);
  var userTypes = _userTypes(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  users.belongsTo(userTypes, { as: "userType", foreignKey: "userTypeId"});
  userTypes.hasMany(users, { as: "users", foreignKey: "userTypeId"});
  userGenrePreferences.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userGenrePreferences, { as: "usergenrepreferences", foreignKey: "userId"});
  userHistory.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userHistory, { as: "userhistories", foreignKey: "userId"});
  userLanguagePreferences.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userLanguagePreferences, { as: "userlanguagepreferences", foreignKey: "userId"});
  userSubscriptions.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userSubscriptions, { as: "usersubscriptions", foreignKey: "userId"});

  return {
    SequelizeMeta,
    userGenrePreferences,
    userHistory,
    userLanguagePreferences,
    userSubscriptions,
    userTypes,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
