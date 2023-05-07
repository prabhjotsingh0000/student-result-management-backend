/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import Result from '../models/resultModel.js';
import Course from '../models/courseModel.js';
import Student from '../models/studentModel.js';

export const addResult = async (req, res) => {
  try {
    const { email, courseName, score } = req.body;
    const error = { message: String };

    const student = await Student.find({ email });
    if (student.length === 0) {
      error.message = 'No student found with given email!';
      return res.status(404).json(error);
    }

    const course = await Course.find({ courseName });
    if (course.length === 0) {
      error.message = 'No course found with given course name';
      return res.status(404).json(error);
    }

    const studentName = `${student[0].firstName} ${student[0].lastName}`;

    const existingResult = await Result.findOne({ email, courseName });
    if (existingResult) {
      error.message = `${studentName} is already graded for ${courseName}!`;
      return res.status(400).json(error);
    }

    const newResult = await new Result({
      studentId: student[0],
      courseId: course[0],
      studentName,
      courseName: course[0].courseName,
      email,
      score,
    });

    await newResult.save();
    return res.status(200).json({
      success: true,
      message: 'Successfully added result!',
      response: newResult,
    });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const getResultWithID = async (req, res) => {
  try {
    const output = await Result.findById(req.params.resultId);
    return res.json(output);
  } catch (error) {
    res.send(error);
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    return res.status(200).json(results);
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const updateResult = async (req, res) => {
  try {
    const output = await Result.findOneAndUpdate({ _id: req.params.resultId }, req.body, {
      new: true,
    });
    return res.status(200).json(output);
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const deleteResult = async (req, res) => {
  try {
    await Result.findOneAndRemove({ _id: req.params.resultId });
    return res.status(200).json({ message: 'Successfully deleted result' });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};
