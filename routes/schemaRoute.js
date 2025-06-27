import { Router } from "express";
import getSchema from '../controllers/schema.js'

const router = Router();

router.get('/getSchema' , getSchema);

export default router;