// ✅ Load .env only in development
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./createServer.js";
import connectDB from "./db.js";

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
    await connectDB(); // ✅ DB connect using process.env.MONGODB_URI
    const app = createServer();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error("❌ Error starting server:", err.message);
    process.exit(1);
  }
}

startServer();
