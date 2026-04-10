'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Role.hasMany(models.User,{
      //   foreignKey: 'roleId',
      //   as: 'user'
      // })
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        [Op.in]: ["viewer","analyst","admin"]
      },
      defaultValue: "viewer"
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};