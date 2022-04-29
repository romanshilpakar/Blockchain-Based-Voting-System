import { Request, Response } from "express";
import { User } from "../../entity/User";
import * as yup from "yup";

const schema = yup.object({
  body: yup.object({
    userId: yup.number().integer().required(),
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  let user;

  try {
    user = await User.findOneOrFail({ where: { id: req.body.userId } });
  } catch (error) {
    return res.status(400).send({ error });
  }

  user.verified = true;

  await User.save(user);

  return res.send({ user });
};
