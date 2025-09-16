import Users from "../../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(400).json("User is already created");
    const encPassword = await bcrypt.hash(password, 10);
    const user = new Users({ name: username, email, password: encPassword });
    const Newuser = await user.save();

    res
      .status(201)
      .json({ message: "user created successfully", user: Newuser._id });
  } catch (error) {
    console.log("error in creating user from createUser");
    res.status(500).json({ message: "Internal server error" });
  }
};
export const LoginUsers = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const cred = await Users.findOne({ email });
    if (!cred) return res.status(400).json({ message: "User not found" });

    // Await bcrypt.compare
    const isMatch = await bcrypt.compare(password, cred.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success
    return res.status(200).json({
      message: "Login successful",
      user: { id: cred._id, name: cred.name, email: cred.email },
    });
  } catch (error) {
    console.error("Error in login user at LoginUsers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
