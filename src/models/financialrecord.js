'use strict';
const {
  Model,
  Op
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
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  FinancialRecord.init({
    amount: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false,
      validate: {min: 0}
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        [Op.in]: ["income","expense"] 
      }
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'FinancialRecord',
  });
  return FinancialRecord;
};