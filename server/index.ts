import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import authRoutes from "./routes/auth.js"; // 👈 ADD THIS
import productRoutes from "./routes/product.js";
import connectDB from "./db.js"; // ✅ Added

import { createServer } from "./createServer";

import sendMailRoutes from "./routes/sendMail.js";

connectDB(); // ✅ Actually connect to MongoDB


export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  
app.use("/api", sendMailRoutes); // ✅ Use the route
  // Routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/auth", authRoutes); // 👈 ADD THIS
    app.use("/api/products", productRoutes);

  return app;
}
