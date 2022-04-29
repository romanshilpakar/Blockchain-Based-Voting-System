import { Router } from "express";
import notVerifiedController from "../controllers/users/not-verified";
import verifyController from "../controllers/users/verify";
import deleteController from "../controllers/users/delete";

const router = Router();

router.get("/all", notVerifiedController);
router.post("/verify", verifyController);
router.delete("/delete/:id", deleteController);

export default router;
