const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected successfully 🎇");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
