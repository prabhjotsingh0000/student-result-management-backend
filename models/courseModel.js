import mongoose from 'mongoose';

const { Schema } = mongoose;
const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: 'Enter a course name',
  },
});

export default mongoose.model('Course', CourseSchema);
