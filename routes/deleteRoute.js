import { Router } from "express";
import DeleteData from "../controllers/deleteData.js";


const router = Router();

router.delete('/data' , DeleteData);

export default router;