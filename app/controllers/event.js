import EventModel from '../models/event.js';

const Event = class Event {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventModel);

    this.run();
  }

  create() {
    this.app.post('/event/create', (req, res) => {
      try {

        const EventModel = new this.EventModel(req.body);

        EventModel.save().then((event) => {

          res.status(200).json(event || {});

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
    this.app.get('/event/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.EventModel.findById(req.params.id).then((event) => {
          res.status(200).json(event || {});
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

  update() {
    this.app.put('/event/update/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.EventModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { upsert: true }).then((event) => {
          res.status(200).json(event || {});
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
    this.app.delete('/event/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.EventModel.deleteOne({ "_id": req.params.id }).then((event) => {
          res.status(200).json(event || {});
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

  addMember() {
    this.app.post('/event/:id/member/add/', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }
        
        this.EventModel.updateMany({ _id: req.params.id }, {
          $push: {
            members: req.body.members
          }
        }, { upsert: true }).then((event) => {
          res.status(200).json(event || {});
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

  // deleteMember() {
  //   this.app.post('/event/:id/member/delete/:idMember', (req, res) => {
  //     try {
  //       if (!req.params.id && !req.params.idMember) {
  //         res.status(400).json({
  //           status: 400,
  //           message: 'bad request: Please use a id in the query string parameters'
  //         });

  //         return;
  //       }

  //       this.EventModel.update({ _id: req.params.id }, {
  //         $unset: {
  //           "members.$[]._id": req.params.idMember
  //         }
  //       }, false, true).then((event) => {
  //         res.status(200).json(event || {});
  //       }).catch((err) => {
  //         res.status(400).json({
  //           status: 400,
  //           message: err
  //         });
  //       });
  //     } catch (err) {
  //       res.status(400).json({
  //         status: 400,
  //         message: err
  //       })
  //     }
  //   })
  // }

  run() {
    this.create();
    this.read();
    this.update();
    this.delete();
    this.addMember();
    // this.deleteMember();
  }
}

export default Event;