import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  groupName: {
    type: String,
    require: [true, 'Group name is required']
  },
  descripton: {
    type: String,
    require: [true, 'Description group is required']
  },
  icon: {
    type: String,
    require: [true, 'Icon group is required']
  },
  imageCover: {
    type: String,
    require: [true, 'Password is required']
  },
  type: {
    type: String,
    require: [true, 'Type of group is required'],
  },
  publishAllow: {
    type: Boolean,
    require: [true, 'Permission to publish is required'],
  },
  createEventAllow: {
    type: Boolean,
    require: [true, 'Permission to create event is required'],
  }
}, {
  collection: 'groups',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;