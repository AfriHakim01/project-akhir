const { Product } = require("../models");

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { name, description, price, stock } = req.body;
      const { role } = req.user; 

      if (role !== "ADMIN") {
        throw {
          name: "Unauthorized",
          errors: [{ message: "Unauthorized User" }],
        };
      }

      if (!req.file) {
        throw {
          name: "Bad Request",
          errors: [{ message: "No photo file uploaded" }],
        };
      }

      const imageBuffer = req.file.buffer;
      const mimetype = req.file.mimetype;

        const photoBase64 =
        `data:${mimetype};base64,` + imageBuffer.toString("base64");

      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        photo: photoBase64,
      });

      res.status(201).json({
        status: true,
        message: "Product created successfully",
        response: newProduct,
      });
    } catch (error) {
      console.error("Error in createProduct:", error);
      next(error); 
    }
  }

  static async productList(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json({
        status: true,
        message: "Product list",
        response: products,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
