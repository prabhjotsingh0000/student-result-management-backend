import mongoose from 'mongoose';

const { Schema } = mongoose;
const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: 'Enter a first name',
  },
  lastName: {
    type: String,
    required: 'Enter a last name',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Student', StudentSchema);
