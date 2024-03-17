import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

// Initialize express
const app = express();

// Define the port
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
