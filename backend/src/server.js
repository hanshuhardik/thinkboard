import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

dotenv.config();
// console.log(process.env.MONGO_URL);
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

const app = express();
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
// middleware
app.use(express.json());

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.use("/api/users", userRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started running  on port :", PORT);
  });
});
