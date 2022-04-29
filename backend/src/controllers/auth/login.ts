import { Request, Response } from "express";
import * as yup from "yup";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

const schema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
  }),
});

export default async (req: Request, res: Response) => {
  let user = null;

  // throws error when the POST-ed queries are invalide (email and password)
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  // throws error if user with provided email not found
  try {
    user = await User.findOneOrFail({ email: req.body.email });
  } catch (error: any) {
    return res.status(404).send(error);
  }

  if (!user.verified) return res.status(400).send("Not verified");

  const match = await bcrypt.compare(req.body.password, user.password);
  //exits if password doesn't match
  if (!match) return res.status(400).send("password doesn't match");

  // if the code reaches here then the user is authenticated
  // hurray :D

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    console.log("you forgot to add .env file to the project?");
    console.log(`
                  add the following:

                  ACCESS_TOKEN_SECRET=976a66a5bd23b2050019f380c4decbbefdf8ff91cf502c68a3fe1ced91d7448cc54ce6c847657d53294e40889cef5bd996ec5b0fefc1f56270e06990657eeb6e

                  REFRESH_TOKEN_SECRET=5f567afa6406225c4a759daae77e07146eca5df8149353a844fa9ab67fba22780cb4baa5ea508214934531a6f35e67e96f16a0328559111c597856c660f177c2
    `);

    return res.status(500).send("server error");
  }

  const plainUserObject = {
    id: user.id,
    name: user.name,
    citizenshipNumber: user.citizenshipNumber,
    email: user.email,
    admin: user.admin,
  };
  const accessToken = jwt.sign(plainUserObject, accessTokenSecret, {
    expiresIn: 60,
  });
  const refreshToken = jwt.sign(plainUserObject, refreshTokenSecret, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    expires: dayjs().add(7, "days").toDate(),
  });

  return res.send({ user, accessToken });
};
