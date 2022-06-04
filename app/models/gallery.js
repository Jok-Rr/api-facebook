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
        type: String,
        require: true
      },
      author: {
        type: mongoose.ObjectId,
        ref: 'User',
        require: true
      },
      comments: [
        {
          author: {
            type: mongoose.ObjectId,
            ref: 'User',
            require: true
          },
          content: {
            type: String,
            require: true
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