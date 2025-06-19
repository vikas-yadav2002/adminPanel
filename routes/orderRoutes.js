import { Router } from "express";
import {OrderImport} from "../controllers/importData.js";

const router = Router();

router.post('/import' , OrderImport);

export default router;