import mongoose from "mongoose";

//schema
//model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //automatically give you the timeStamp  CREATEDAT , UPDATEDAT
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
