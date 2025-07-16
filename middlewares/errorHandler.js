module.exports = function errorHandler(error, req, res, next) {
  let message = {
    status: false,
    message: "Internal Server Error",
  };
  console.log("<<<<<<<<<<<<<<masuk eror habndler");

  let code = 500;

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
    case "Bad Request":
      code = 400;
      message = {
        status: false,
        message: error.errors[0].message,
      };
      break;
    case "Unauthorized":
      code = 401;
      message = {
        status: false,
        message: error.errors[0].message,
      };
      break;
  }

  console.log("masuk ke error handler", error, "<<<<<<<");

  res.status(code).json(message);
};
