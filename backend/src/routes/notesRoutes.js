import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNotesById,
  updateNote,
} from "../../models/controllers/notesControllers.js";

const router = express.Router();

router.get("/user/:userid", getAllNotes);
router.get("/:id", getNotesById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
