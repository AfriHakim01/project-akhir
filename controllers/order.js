const { where } = require("sequelize");
const { User, Order, Product, DetailOrder, sequelize } = require("../models");

class OrderController {
  static async getCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const cart = await Order.findOne({
        where: { userId, status: "CART" },
        include: [{ model: DetailOrder, include: [Product] }], 
      });

      if (!cart) {
        return res
          .status(200)
          .json({ status: true, message: "Keranjang kosong", response: null });
      }

      res.status(200).json({
        status: true,
        message: "Keranjang berhasil diambil",
        response: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.user;
      const { detailOrder } = req.body;
      const order = await Order.create(
        { userId: id, status: "CART" },
        { transaction: t }
      );

      const createdDetails = [];

      if (!detailOrder || detailOrder.length === 0) {
        throw {
          name: "Bad Request",
          errors: [
            {
              message: "Detail order tidak boleh kosong.",
            },
          ],
        };
      }
      for (const detail of detailOrder) {
        const product = await Product.findByPk(detail.productId, {
          transaction: t,
        });
        if (!product) {
          throw {
            name: "Bad Request",
            errors: [
              {
                message: `Produk dengan ID ${detail.productId} tidak ditemukan.`,
              },
            ],
          };
        }

        if (detail.quantity > product.stock) {
          throw {
            name: "Bad Request",
            errors: [
              {
                message: `Stok produk ${product.name} tidak mencukupi.`,
              },
            ],
          };
        }
        await Product.update(
          {
            stock: product.stock - detail.quantity,
          },
          {
            where: { id: detail.productId },
            transaction: t,
          }
        );
        const newDetail = await DetailOrder.create(
          {
            productId: detail.productId,
            quantity: detail.quantity,
            orderId: order.id,
          },
          { transaction: t }
        );
        createdDetails.push(newDetail);
      }

      await t.commit();
      res.status(201).json({
        status: true,
        message: "Order (keranjang) berhasil dibuat",
        response: {
          orderId: order.id,
          userId: order.userId,
          status: order.status,
          details: createdDetails,
        },
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = OrderController;
