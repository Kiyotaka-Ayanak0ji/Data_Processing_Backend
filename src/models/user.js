'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role,{
        foreignKey: 'roleId',
        as: "role"
      });
      User.hasMany(models.FinancialRecord,{
        foreignKey: "userId",
        as: "records"
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    status: DataTypes.STRING,
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};