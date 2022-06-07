import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  link: {
    type: {
      type: String,
      default: 'group'
    },
    link_id: {
      type: mongoose.ObjectId,
      default: mongoose.ObjectId,
    }
  },
  message: {
    content: {
      type: String,
      require: [true, 'content is required']
    },
    author_id: {
      type: mongoose.ObjectId,
      ref: 'User',
      require: true
    },
    create_at: {
      type: Date,
      default: Date.now
    },
    comment_id: {
      type: mongoose.ObjectId,
      ref: 'User',
      default: null,
    }
  }
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