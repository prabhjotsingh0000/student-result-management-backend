/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import Student from '../models/studentModel.js';
import Result from '../models/resultModel.js';

export const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, dob } = req.body;
    const error = { message: String };
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      error.message = 'Email already exists!';
      return res.status(400).json(error);
    }
    const newStudent = new Student({ firstName, lastName, email, dob });
    await newStudent.save();
    return res.status(200).json({
      success: true,
      message: 'Successfully added student!',
      response: newStudent,
    });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const getStudentWithID = async (req, res) => {
  try {
    const output = await Student.findById(req.params.studentId);
    return res.json(output);
  } catch (error) {
    res.send(error);
  }
};

export const getStudentWithEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const error = { message: String };
    const student = await Student.find({ email });

    if (student.length === 0) {
      error.message = 'No Student Found';
      return res.status(404).json(error);
    }

    return res.status(200).json({ result: student });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const output = await Student.findOneAndUpdate({ _id: req.params.studentId }, req.body, {
      new: true,
    });
    return res.status(200).json(output);
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findOneAndRemove({ _id: req.params.studentId });
    await Result.deleteMany({ studentId: req.params.studentId });
    return res.status(200).json({ message: 'Successfully deleted student' });
  } catch (err) {
    const error = { backendError: String };
    error.backendError = err;
    res.status(500).json(error);
  }
};
