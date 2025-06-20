import { Router } from "express";
import individualImport from "../controllers/individualImport.js";
 const router = Router();


 router.post("/data" , individualImport );


 export default router;