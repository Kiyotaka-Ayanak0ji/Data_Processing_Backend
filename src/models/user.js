'use strict';
const {
  Model,
  Op
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
        as: 'role'
      });
      User.hasMany(models.FinancialRecord,{
        foreignKey: 'userId',
        as: 'record'
      })

    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {isEmail: true}
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      validate: {
        isIn: ["active","inactive"]
      },
      defaultValue: "active"
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'User',
  });
  return User;
};