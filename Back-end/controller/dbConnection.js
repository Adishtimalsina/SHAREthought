const mongoose = require("mongoose");

const dataBaseConnection = async () => {
  try {
    await mongoose
      .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
      })
      .then(() => console.log("Database connected"));
  } catch (error) {
    console.log("unsuccessful Database connection");
  }
};

module.exports = dataBaseConnection;
