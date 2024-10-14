import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please fill in all fields"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();

    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

// TODO: Implement signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "Please fill in all fields"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
     return next(errorHandler(404, "User not found"));
    }
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
    if (!isPasswordCorrect) {
     return next(errorHandler(401, "Incorrect password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const {password: pass, ...rest} = user._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
