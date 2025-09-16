import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
// console.log(process.env.MONGO_URL);
const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

// middleware
app.use(express.json());

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started running  on port :", PORT);
  });
});
