import Users from "../../models/User.js";
import User from "../../models/User.js";
import Attendance from "../../models/Attendance.js";
import { Op } from 'sequelize';

export const createAttendanceForCurrentDate = async (req, res) => {
  try {
      const { date } = req.body;
      if (!date || isNaN(Date.parse(date))) {
          return res.status(400).json({ error: 'Invalid date format' });
      }

      const users = await Users.findAll({ where: { role_id: 2 } });

      for (const user of users) {
          const existingAttendance = await Attendance.findOne({ where: { user_id: user.id, date } });
          if (!existingAttendance) {
              await Attendance.create({ user_id: user.id, date, status: 'Absent' });
          }
      }

      return res.status(201).json({ message: 'Attendance records created successfully for the provided date' });
  } catch (error) {
      console.error('Error creating attendance records:', error);
      return res.status(500).json({ error: 'Failed to create attendance records' });
  }
};

export const getAllAttendanceWithUsers = async (req, res) => {
  try {
    const { date } = req.query;
    let whereCondition = {};

    if (date) {
      whereCondition = {
        date: {
          [Op.eq]: date,
        },
      };
    }

    const attendance = await Attendance.findAll({
      where: whereCondition,
      include: [
        { model: User, attributes: ['id', 'name', 'phone', 'memberId', 'email'] },
      ],
    });

    res.json(attendance);
  } catch (error) {
    console.error("Error:", error);
  }
}

export const updateAttendanceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    if (status !== 'Present' && status !== 'Absent' && status !== 'Late') {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    attendance.status = status;
    await attendance.save();

    return res.status(200).json({ message: 'Attendance record updated successfully', attendance });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating attendance record', error: error.message });
  }
};