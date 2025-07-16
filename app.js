if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const storage = multer.memoryStorage(); 
module.exports = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.use("/api", require("./routes"));
app.use(require("./middlewares/errorHandler"));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
