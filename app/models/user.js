import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  firstname: {
    type: String,
    require: [true, 'First name is required']
  },
  lastname: {
    type: String,
    require: [true, 'Last name is required']
  },
  age: {
    type: Number,
    require: [true, 'Age is required'],
    min: [18, 'Age must not inferior to 18 years']
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
    minlength: [8, 'Password must be more than 8 characters']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/],
    unique: [true, 'Email already exist'],
    require: [true, 'Email name is required'],
    index: true
  },
  hash: String,
  salt: String
}, {
  collection: 'users',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;