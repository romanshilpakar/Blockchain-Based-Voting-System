import { Request, Response } from "express";
import { User } from "../../entity/User";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).send("no id found");

  try {
    await User.delete(id);
  } catch (error) {
    return res.status(400).send({ error });
  }

  return res.send({ userId: id });
};
