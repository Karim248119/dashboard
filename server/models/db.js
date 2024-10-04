const db_url = require("./config.js");
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(db_url, {
      dbName: "e-commerce",
    });
    console.log("Connect to ecommerce db");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
