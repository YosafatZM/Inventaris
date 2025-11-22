'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    static associate(models) {
      Karyawan.hasMany(models.Barang, {
        foreignKey: 'karyawanId',
        as: 'barangs'
      });
    }
  }
  Karyawan.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jabatan: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    telepon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Karyawan',
  });
  return Karyawan;
};