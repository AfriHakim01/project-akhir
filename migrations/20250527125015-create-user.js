"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          isAddressRequired(value) {
            if (this.role === "CLIENT" && (value === null || value === "")) {
              throw new Error("Phone is required for CLIENT roles.");
            }
          },
        }
      },
      address: {
        type: Sequelize.STRING,
        validate: {
          isAddressRequired(value) {
            if (this.role === "CLIENT" && (value === null || value === "")) {
              throw new Error("Address is required for CLIENT roles.");
            }
          },
        },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        validate: {
          isAddressRequired(value) {
            if (this.role === "CLIENT" && (value === null || value === "")) {
              throw new Error("City is required for CLIENT roles.");
            }
          },
        }
      },
      province: {
        type: Sequelize.STRING,
        validate: {
          isAddressRequired(value) {
            if (this.role === "CLIENT" && (value === null || value === "")) {
              throw new Error("Province is required for CLIENT roles.");
            }
          },
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
