import { Router } from "express";
import { ClientImport } from "../controllers/importData.js";

const router = Router();
router.post('/import' , ClientImport )


export default router;