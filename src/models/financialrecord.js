'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FinancialRecord.belongsTo(models.User,{
        foreignKey: "userId",
        as: "user"
      })
    }
  }
  FinancialRecord.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    amount: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FinancialRecord',
  });
  return FinancialRecord;
};