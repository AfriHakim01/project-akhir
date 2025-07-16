"use strict";

const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email already taken",
        },
        validate: {
          isEmail: {
            msg: "Please enter a valid email address.",
          },
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
        },
      },
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, option) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  return User;
};
