import express from "express";
import {
  createUser,
  LoginUsers,
} from "../../models/controllers/userControllers.js";

const userRoutes = express.Router();
userRoutes.post("/login", LoginUsers);
userRoutes.post("/create", createUser);

export default userRoutes;
