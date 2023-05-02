import express from 'express'
import { deleteAttendence, getAllAttendence, markAttendence, singleAttendence, updateAttendence } from '../controllers/attendence.js';
const router = express.Router();

router.get("/", getAllAttendence)
router.post("/mark", markAttendence)
router.get("/:attendenceId", singleAttendence)
router.put("/:attendenceId", updateAttendence)
router.delete("/:attendenceId", deleteAttendence)

export default router;