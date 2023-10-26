import UserModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv"

// dotenv.config()

export const signUp = async (req, res) => {
  //  get all the data from req.body
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    // check if the confirmed password is correct
    if (password !== confirmPassword)
      return res
        .status(409)
        .json({ message: "Confirm password does not match. Please try again!" });

    // check if email is already exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already exist. Please try again!" });

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // save the new user with password in MongoDB
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // generate the token
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // send the token, user info back to client
    // **note: sending all user info is not a good practice
    res.status(201).json({ token, existingUser: newUser });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // find email in the database
  const existingUser = await UserModel.findOne({ email });

  // if there is no user, return
  if (!existingUser)
    return res.status(404).json({ message: "Incorrect user's credential. Please try again!" });

  // compare password with the password in database using brcrypt
  const compareResult = await bcryptjs.compare(password, existingUser.password);

  // wrong password case
  if (!compareResult)
    return res.status(401).json({ message: "Incorrect user's credential. Please try again!" });

  // correct password case -> generate token -> send back the token
  const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return res.status(200).json({ token, existingUser });
};
