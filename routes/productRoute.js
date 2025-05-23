import { Router } from "express";
import { ProductImport } from "../controllers/importData.js";

const router = Router();

router.post('/import' , ProductImport);

export default router;