import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.end();
};
