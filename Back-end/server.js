const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
app.use(morgan("dev"));

app.use(express.json());
app.use(express.text());
const https = require("https");
const Router = require("./routes/userRouter.js");
const dataBaseConnection = require("./controller/dbConnection.js");

//database connection
dataBaseConnection();

app.use(cors({ origin: process.env.FRONT_END_ADDRESS, credentials: true }));
app.use(cookieParser());
//router
app.use("/api/v1", Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello");
});
