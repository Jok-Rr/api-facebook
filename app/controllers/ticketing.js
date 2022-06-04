import TicketingModel from '../models/ticketing.js';
import crypto from 'crypto';

const Ticketing = class Ticketing {
  constructor(app, connect) {
    this.app = app;
    this.TicketingModel = connect.model('Ticketing', TicketingModel);

    this.run();
  }

  create() {
    this.app.post('/ticketing/create', (req, res) => {
      try {

        const TicketingModel = new this.TicketingModel(req.body);

        TicketingModel.save().then((ticketing) => {

          res.status(200).json(ticketing || {});

        }).catch((err) => {

          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        })
      }
    })
  }

  read() {
    this.app.get('/ticketing/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.TicketingModel.findById(req.params.id).then((ticketing) => {
          res.status(200).json(ticketing || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        })
      }
    })
  }

  delete() {
    this.app.delete('/ticketing/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.TicketingModel.deleteOne({ "_id": req.params.id }).then((ticketing) => {
          res.status(200).json(ticketing || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        })
      }
    })
  }

  updateOneTicket() {
    this.app.post('/ticketing/:id/ticket/update/:idticket', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.TicketingModel.updateMany(
          { '_id': req.params.id, 'tickets._id': req.params.idticket },
          { $set: { 'tickets.$': req.body.tickets } },
          { upsert: true }).then((ticketing) => {

            res.status(200).json(ticketing || {});

          }).catch((err) => {
            res.status(400).json({
              status: 400,
              message: err
            });
          });

      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        })
      }
    })
  }

  addOneTicket() {
    this.app.post('/ticketing/:id/ticket/add', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });
          return;
        }
        this.TicketingModel.updateMany({ _id: req.params.id }, {
          $push: {
            tickets: req.body.tickets
          }
        }, { upsert: true }).then((ticketing) => {
          res.status(200).json(ticketing || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        })
      }
    })
  }

  addPurchase() {
    this.app.post('/ticketing/:id/buy', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });
          return;
        }
        this.TicketingModel.updateMany({ _id: req.params.id }, {
          $push: {
            purchases: req.body.purchases
          }
        }, { upsert: true }).then((ticketing) => {
          res.status(200).json(ticketing || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        })
      }
    })
  }

  run() {
    this.create();
    this.read();
    this.updateOneTicket();
    this.addOneTicket();
    this.addPurchase();
    this.delete();
  }
}

export default Ticketing;