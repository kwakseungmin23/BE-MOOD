'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Composers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Musics, {
        sourceKey: "composer",
        foreignKey: "composer",
      });
    }
  }
  Composers.init({
    composerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    composer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    describe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'Composers',
  });
  return Composers;
};