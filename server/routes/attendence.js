import express from 'express'
import { getAllAttendence, markAttendence } from '../controllers/attendence.js';
const router = express.Router();

router.get("/", getAllAttendence)
router.post("/mark", markAttendence)

export default router;