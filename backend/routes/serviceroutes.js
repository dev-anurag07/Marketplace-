import express from 'express'
import { addservice ,getservices } from '../controllers/serviceController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import authorizeroles from "../middleware/rolemiddleware.js"


const router =express.Router();

router.post("/add",authMiddleware,authorizeroles("provider"), addservice);
router.get("/all",getservices)

export default router;