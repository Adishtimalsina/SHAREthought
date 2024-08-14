const mongoose = require("mongoose");

const dataBaseConnection = async () => {
  try {
    await mongoose
      .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database connected"));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dataBaseConnection;
