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
    ref: 'User',
    require: true
  },
  questions: [
    {
      question: {
        type: String,
        require: true
      },
      responses: [{
        resp: {
          type: String,
          require: true
        }
      }]
    }
  ],
  replys: [{
    author: {
      type: mongoose.ObjectId,
      ref: 'User',
      require: true
    },
    question: {
      type: mongoose.ObjectId,
      require: true
    },
    reply: {
      type: mongoose.ObjectId,
      require: true
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