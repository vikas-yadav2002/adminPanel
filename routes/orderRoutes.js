import { Router } from "express";
import {OrderImport} from "../controllers/importData.js";

const router = Router();

router.get('/Data' , OrderImport);

export default router;