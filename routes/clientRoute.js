import { Router } from "express";
import { ClientImport } from "../controllers/importData.js";
import { Data} from "../controllers/Data.js";

const router = Router();
router.post('/import' , ClientImport )




export default router;