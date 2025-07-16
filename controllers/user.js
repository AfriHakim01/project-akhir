const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

class UserController {
  static async registerClient(req, res, next) {
    try {
      const { fullName, email, password, phone, address, city, province } =
        req.body;
      const newUser = await User.create({
        fullName,
        email,
        password,
        phone,
        address,
        city,
        province,
        role: "CLIENT",
      });

      res.status(201).json({
        status: true,
        message: "User created successfully",
        response: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      const { fullName, email, password, phone, address, city, province } =
        req.body;
      const newUser = await User.create({
        fullName,
        email,
        password,
        phone,
        address,
        city,
        province,
        role: "ADMIN",
      });

      res.status(201).json({
        status: true,
        message: "User created successfully",
        response: newUser,
      });
    } catch (error) {
        console.log(error);
        
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user)
        throw {
          name: "Bad Request",
          errors: [{ message: "Invalid email or password" }],
        };
      const valPassword = bcrypt.compareSync(password, user.password);
      if (!valPassword)
        throw {
          name: "Bad Request",
          errors: [{ message: "Invalid email or password" }],
        };
      const access_token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        status: true,
        message: "Login success",
        response: {
          id: user.id,
          email: user.email,
          role: user.role,
          access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async clientList(req, res, next) {
    try {
      const clients = await User.findAll({ where: { role: "CLIENT" } });
      res.status(200).json({
        status: true,
        message: "Client list",
        response: clients,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
