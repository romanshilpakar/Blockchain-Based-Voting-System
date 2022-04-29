import { Request, Response } from "express";
import ElectionContract from "../../web3";

export default async (_: Request, res: Response) => {
  const instance = await ElectionContract.deployed();

  const candidates = await instance.getCandidates();
  const votes = await instance.getVotes();

  const response: any = {};

  for (let i = 0; i < candidates.length; i++) {
    response[candidates[i]] = 0;
  }

  for (let i = 0; i < votes.length; i++) {
    const vote = votes[i];

    if (typeof response[vote[3]] != "undefined")
      response[vote[3]] = response[vote[3]] + 1;
  }

  return res.send({ votes: response });
};
