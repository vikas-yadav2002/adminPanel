import { Router } from "express";

import { Data} from "../controllers/Data.js";

const router = Router();
router.post('/Data' , Data)



export default router;