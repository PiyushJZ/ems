import Attendence from "../models/Attendence.js"
import { validateObjectId } from "../utils/validation.js";

export const getAllAttendence = async (req,res) => {
    try {
        const data = await Attendence.find();
        res
          .status(200)
          .json({ data, status: true });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
}

export const markAttendence = async (req,res) => {
    try {
        
        const {userId,date,markedBy,description} = req.body;
        // userId - (_id) of the person's who's attendence is marked

        if (!userId) {
            return res
              .status(400)
              .json({ status: false, message: "User Id not found" });
          }

          if (!validateObjectId(userId)) {
            return res.status(400).json({ status: false, message: "User Id not valid" });
          }

          if (!date) {
            return res
              .status(400)
              .json({ status: false, message: "Date not found" });
          }

          if (!markedBy) {
            return res
              .status(400)
              .json({ status: false, message: "Marked by not found" });
          }

          // check if the attendence existed
          const findAttendence = await Attendence.findOne({userId,date})
          console.log(findAttendence)
          
          if(findAttendence){
            return res.status(400).json({status: false, message: `Attendence for date ${date} is already marked`})
          }

          const attendence = await Attendence.create({userId, date, markedBy, description})
          res
        .status(200)
        .json({ attendence, status: true, message: "Attendence marked successfully" });

    } catch (error) {
        console.error("Error >>>",error)
        return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
}