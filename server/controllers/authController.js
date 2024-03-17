import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", savedUser });
  } catch (error) {
    res.status(500).json({ error_message: error.message, error });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed. User not found." });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Authentication failed. Wrong password." });
    }
    const accessToken = await generateToken(user);
    const { ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
    res.json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error_message: error.message, error });
  }
};

const generateToken = async (validUser) => {
  const generatedToken = jwt.sign(
    { id: validUser._id, username: validUser.username },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return generatedToken;
};

const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error({ error_message: "Error hashing password:", error });
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error({ error_message: "Error comparing passwords:", error });
  }
};
