import mongoose from 'mongoose';


const Schema = new mongoose.Schema({
  event_id: {
    type: mongoose.ObjectId,
    ref: 'Event'
  },
  tickets: [
    {
      name: {
        type: String,
        require: true
      },
      amount: {
        type: Number,
        require: true

      },
      quantity: {
        type: Number,
        require: true
      }
    }
  ],
  purchases: [
    {
      ticket_id: {
        type: mongoose.ObjectId
      },
      contact: {
        externalBuyer: {
          type: Boolean,
          default: false
        },
        exterior: {
          firstname: {
            type: String,
            require: true
          },
          lastname: {
            type: String,
            require: true
          },
          address: {
            type: String,
            require: true
          },
          purchase_date: {
            type: Date,
            default: Date.now
          }
        },
        internal: {
          user_id: {
            type: mongoose.ObjectId,
            ref: 'User'
          }
        }
      },



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