import mongoose from "mongoose";

//schema
//model based off of that schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //automatically give you the timeStamp  CREATEDAT , UPDATEDAT
);

const Users = mongoose.model("Users", userSchema);
export default Users;
