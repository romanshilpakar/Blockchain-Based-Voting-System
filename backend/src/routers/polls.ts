import express from "express";

import startController from "../controllers/polls/start";
import fetchController from "../controllers/polls/fetch";
import statusController from "../controllers/polls/status";
import endController from "../controllers/polls/end";
import resetController from "../controllers/polls/reset";
import votesController from "../controllers/polls/votes";
import voteController, { checkVoteability } from "../controllers/polls/vote";

const router = express.Router();

router.get("/", fetchController);
router.get("/status", statusController);
router.get("/votes", votesController);

router.post("/start", startController);
router.post("/end", endController);
router.post("/reset", resetController);
router.post("/check-voteability", checkVoteability);
router.post("/vote", voteController);

export default router;
