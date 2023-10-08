import { getUserByEmail } from "../DAO/user.dao.js";
import { SALT_ROUNDS, SECRET } from "../constants.js";
import User from "../models/User.model.js ";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  if (!password || !email) {
    return res.status(400).send("Missing credentials");
  }
  try {
    const user = await getUserByEmail(email);

    console.log(user);

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
          email: user.email,
          role:user.role
        },
        SECRET,
        { expiresIn: 60 * 60 }
      );
      res.status(200).send({ token });
    } else {
      res.status(401).send("Wrong email or password");
    }
  } catch (e) {
    res.status(500).send("Could not log in user");
  }
};

export const register = async (req, res) => {
  const { password, ...data } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ ...data, password: hashedPassword });

    await user.save();

    res.status(201).send("User created successfuly");
  } catch (e) {
    res.status(500).send("Could not create user");
  }
};
