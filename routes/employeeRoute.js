import { Router } from "express";
import { EmployeeImport} from "../controllers/importData.js";

const router = Router();

router.post('/import' , EmployeeImport);

export default router;