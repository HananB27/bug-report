import mongoose from 'mongoose';
const { Schema } = mongoose;

const bugSchema = new Schema({
  title: String,
  steps: String,
  assignedTo:String,
  reportedBy:String,
  completed:Boolean,
  timeStamps: {
    type:Date,
    default:new Date()
  },
  severity:String
});

const Bug = mongoose.model('Bugs', bugSchema);

export default Bug;
