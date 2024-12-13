import { sign } from "jsonwebtoken";
import { User } from "../model/user-model";
import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("form data: ", req.body);

  try {
    const user = await User.findOne({ where: { email } });
    const dbpassword = user?.dataValues.password;
    let isvalidPassword = false;
    password === dbpassword
      ? (isvalidPassword = true)
      : (isvalidPassword = false);

    console.log("user data: ", user, isvalidPassword);

    if (user == null || isvalidPassword === false) {
      res.status(401).json({ message: "Invalid Credentails" });
      return;
    }

    try {
      const token = sign(
        { name: user.dataValues.name, email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ message: "Logged in successfully", token });
    } catch (err) {
      // console.error("Error generating token: ", err);
      res.status(404).json({ message: "Error generating token: " + err });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  loginUser,
};
