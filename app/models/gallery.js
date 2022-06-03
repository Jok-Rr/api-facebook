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
  album: [
    {
      photo: {
        type: String
      },
      author: {
        type: mongoose.ObjectId,
        ref: 'User'
      },
      comments: [
        {
          author: {
            type: mongoose.ObjectId,
            ref: 'User'
          },
          content: {
            type: String
          }
        }
      ]
    }
  ]
}, {
  collection: 'galleries',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;