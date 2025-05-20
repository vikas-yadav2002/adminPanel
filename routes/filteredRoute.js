

import { GetOrderDetailsWithClientAndEmp } from "../controllers/filteredData.js";
import { Router } from "express"
const router = Router();
router.get('/filter' , GetOrderDetailsWithClientAndEmp)


export default router;