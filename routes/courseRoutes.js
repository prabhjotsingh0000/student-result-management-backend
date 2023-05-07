/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllCourses,
  getCourseWithID,
  updateCourse,
  addCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();
router.get('/getallcourses', getAllCourses);
router.get('/getcourse/:courseId', getCourseWithID);
router.post('/addcourse', addCourse);
router.put('/updatecourse/:courseId', updateCourse);
router.delete('/deletecourse/:courseId', deleteCourse);

export default router;
