import { Router } from "express";
import { runQuery } from "../controllers/runQuery.js";

const router = Router();

router.post('/runQuery' , runQuery);

export default router;