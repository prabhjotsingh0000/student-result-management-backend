/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllStudents,
  getStudentWithID,
  getStudentWithEmail,
  addStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();
router.get('/getallstudents', getAllStudents);
router.get('/getstudent/:studentId', getStudentWithID);
router.post('/getstudentwithemail', getStudentWithEmail);
router.post('/addstudent', addStudent);
router.put('/updatestudent/:studentId', updateStudent);
router.delete('/deletestudent/:studentId', deleteStudent);

export default router;
