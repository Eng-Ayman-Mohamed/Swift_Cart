const { connectDB } = require("../src/config/db");
require("dotenv").config();
const app = require("../src/app");

// Middleware to prevent "Buffering" timeouts
app.use(async (req, res, next) => {
  try {
    await connectDB(); // This now correctly awaits the singleton connection
    next();
  } catch (err) {
    console.error("Critical DB Error:", err);
    res.status(500).json({
      error: "Database connection failed",
      details: err.message,
    });
  }
});

module.exports = app;
