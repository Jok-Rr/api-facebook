import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  event_id: {
    type: mongoose.ObjectId,
    ref: 'Event',
    default: null
  },
  group_id: {
    type: mongoose.ObjectId,
    ref: 'Group',
    default: null
  },
  messages: [
    {
      // message_id: {
      //   type: mongoose.ObjectId,
      //   default: new mongoose.Types.ObjectId()
      // },
      content: {
        type: String,
        require: [true, 'content is required']
      },
      author: {
        type: mongoose.ObjectId,
        ref: 'User'
      },
      comments: [{
        // comment_id: {
        //   type: mongoose.ObjectId,
        //   default: new mongoose.Types.ObjectId()
        // },
        author: {
          type: mongoose.ObjectId,
          ref: 'User'
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