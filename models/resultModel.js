import mongoose from 'mongoose';

const { Schema } = mongoose;
const ResultSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'student',
  },
  studentName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Result', ResultSchema);
