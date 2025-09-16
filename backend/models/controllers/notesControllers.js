import Note from "../../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const userid = req.params.userid;
    // console.log(userid);
    const notes = await Note.find({ userid: userid }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.log("error in getting all the node in getAllController  ");
    res.status(500).json({ message: "Internal server Error" });
  }
};
export const getNotesById = async (req, res) => {
  try {
    const noteId = await Note.findById(req.params.id);
    console.log(noteId);
    if (!noteId) return res.status(404).json({ message: "note not found" });
    res.status(200).json(noteId);
  } catch (error) {
    console.log("error getting in fetching note by id at getNotesById");
    res.status(500).json({ message: "internal server error" });
  }
};
export async function createNote(req, res) {
  try {
    const { title, content, userid } = req.body;
    const newNote = new Note({ title, content, userid });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.log("error in creating new note in createNode ");
    res.status(500).json({ message: "Internal server Error" });
  }
}

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("error in creating new note in createNode ");
    res.status(500).json({ message: "Internal server Error" });
  }
};

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note Already deleted" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("error in deleting the note at deleteNote");
    res.status(500).json({ message: "Internal server error" });
  }
}

// both the are the function work is same just the syntax is different
// don't think both are different things
