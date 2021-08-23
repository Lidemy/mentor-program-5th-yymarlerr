'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lottery_prizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  lottery_prizes.init({
    prize: DataTypes.STRING,
    desc: DataTypes.STRING,
    link: DataTypes.STRING,
    percentage: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lottery_prizes',
  });
  return lottery_prizes;
};