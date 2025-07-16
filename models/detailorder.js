"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailOrder extends Model {
    
    static associate(models) {
      DetailOrder.belongsTo(models.Order, { foreignKey: "orderId" });
      DetailOrder.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  DetailOrder.init(
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailOrder",
    }
  );
  return DetailOrder;
};
