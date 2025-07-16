// ✅ Load .env only in development
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import connectDB from "./db.js";

// ✅ Exported separately for Vite's dev middleware
export function createServer() {
  const app = express();

  // Your middlewares & routes will go here
  app.use(express.json());

  return app;
}

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load dotenv ONLY if not in production (local only)
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB(); // ✅ Connect MongoDB

    const app = createServer(); // ✅ Call exported function
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error("❌ Error starting server:", err.message);
    process.exit(1);
  }
}

startServer();
