import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Group name is required']
  },
  descripton: {
    type: String,
    require: [true, 'Description event is required']
  },
  startDate: {
    type: Date,
    require: [true, 'Start Date event is required']
  },
  endDate: {
    type: Date,
    require: [true, 'End Date event is required']
  },
  places: {
    type: String,
    require: [true, 'End Date event is required']
  },
  imageCover: {
    type: String,
    require: [true, 'Image Cover is required']
  },
  private: {
    type: Boolean,
    require: [true, 'Private status is required'],
  },
  members: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
      },
      role: {
        type: String,
        require: true
      }
    }
  ]
}, {
  collection: 'events',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;