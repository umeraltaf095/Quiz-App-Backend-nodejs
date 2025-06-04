import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,

},
  role: {
    type: String,
    enum: ['student' , 'teacher'],
    required: true,
  },
});

const userModel = mongoose.model('userModel', registerSchema);
export default userModel;
