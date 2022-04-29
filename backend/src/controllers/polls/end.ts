import { Request, Response } from "express";
import ElectionContract, { web3 } from "../../web3";
import memoryCache from "memory-cache";

export default async (_: Request, res: Response) => {
  const accounts = await web3.eth.getAccounts();
  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();

  if (status !== "running") return res.status(400).send("election not started");

  await instance.endElection({ from: accounts[0] });

  const votes = await instance.getVotes();

  memoryCache.clear();

  return res.send({ votes });
};
