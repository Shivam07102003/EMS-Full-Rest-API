import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  extension: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dateHired: {
    type: Date,
    default: Date.now,
  },
  currentlyEmployed: {
    type: Boolean,
    default: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;