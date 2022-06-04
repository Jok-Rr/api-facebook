import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  event_id: {
    type: mongoose.ObjectId,
    ref: 'Event',
    default: null,
    require: true
  },
  group_id: {
    type: mongoose.ObjectId,
    ref: 'Group',
    default: null,
    require: true
  },
  messages: [
    {
      content: {
        type: String,
        require: [true, 'content is required']
      },
      author: {
        type: mongoose.ObjectId,
        ref: 'User',
        require: true
      },
      comments: [{
        author: {
          type: mongoose.ObjectId,
          ref: 'User',
          require: true
        },
        content: {
          type: String,
          require: [true, 'cCntent is required']
        }
      }]
    }
  ]
}, {
  collection: 'threads',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;