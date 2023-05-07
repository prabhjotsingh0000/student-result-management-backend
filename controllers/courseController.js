/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Course from '../models/courseModel.js';
import Result from '../models/resultModel.js';

export const addCourse = async (req, res) => {
  try {
    const { courseName } = req.body;
    const error = { message: String };
    const existingCourse = await Course.findOne({ courseName });
    if (existingCourse) {
      error.message = 'Course already exists!';
      return res.status(400).json(error);
    }
    const newCourse = new Course({ courseName });
    await newCourse.save();
    return res.status(200).json({
      success: true,
      message: 'Successfully added course!',
      response: newCourse,
    });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const getCourseWithID = async (req, res) => {
  try {
    const output = await Course.findById(req.params.courseId);
    return res.json(output);
  } catch (error) {
    res.send(error);
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const output = await Course.findOneAndUpdate({ _id: req.params.courseId }, req.body, {
      new: true,
    });
    return res.status(200).json(output);
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndRemove({ _id: req.params.courseId });
    await Result.deleteMany({ courseId: req.params.courseId });
    return res.status(200).json({ message: 'Successfully deleted course' });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};
