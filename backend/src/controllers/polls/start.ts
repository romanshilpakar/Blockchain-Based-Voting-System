import { Request, Response } from "express";
import * as yup from "yup";
import ElectionContract, { web3 } from "../../web3";

const schema = yup.object({
  body: yup.object({
    name: yup.string().min(3).required(),
    description: yup.string().min(10).required(),
    candidates: yup.array(
      yup.object({
        name: yup.string().min(3),
        info: yup.string().min(10),
      })
    ),
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();
  if (status !== "not-started")
    return res.status(400).send("election already started or not reset");

  const accounts = await web3.eth.getAccounts();

  await instance.setElectionDetails(req.body.name, req.body.description, {
    from: accounts[0],
  });

  for (let i = 0; i < req.body.candidates.length; i++) {
    const candidate = req.body.candidates[i];
    await instance.addCandidate(candidate.name, candidate.info, {
      from: accounts[0],
    });
  }

  return res.send(req.body);
};
