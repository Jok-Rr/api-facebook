import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  event_id: {
    type: mongoose.ObjectId,
    ref: 'Event'
  },
  tickets: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number

      },
      quantity: {
        type: Number
      }
    }
  ],
  purchases: [
    {
      ticket_name: {
        type: String
      },
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      address: {
        type: String
      },
      purchase_date: {
        type: Date,
        default: Date.now
      }


    }
  ]
}, {
  collection: 'tickets',
  minimize: true,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id;

    delete ret._id;
  }
});

export default Schema;