import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Survey name is required']
  },
  event_id: {
    type: String,
    require: [true, 'Description survey is required']
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  questions: [
    {
      question: {
        type: String
      },
      responses: [{
        resp: {
          type: String
        }
      }]
    }
  ],
  replys: [{
    author: {
      type: mongoose.ObjectId,
      ref: 'User'
    },
    question: {
      type: mongoose.ObjectId
    },
    reply: {
      type: mongoose.ObjectId
    }
  }]
}, {
  collection: 'surveys',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;