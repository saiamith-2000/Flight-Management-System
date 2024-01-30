'use strict';
const {
  Model
} = require('sequelize');
const { ENUMS }=require('../utils/common');
const {BUISINESS,PREMIUM_ECONOMY,FIRST_CLASS,ECONOMY}=ENUMS.SEAT_TYPE;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId'
      });
    }
  }
  Seat.init({
    row:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    col:{
      type:DataTypes.STRING,
      allowNull:false
    },
    airplaneId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    seat_type:{
      type:DataTypes.ENUM,
      values:[BUISINESS,ECONOMY,PREMIUM_ECONOMY,FIRST_CLASS],
      defaultValue: ECONOMY,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};