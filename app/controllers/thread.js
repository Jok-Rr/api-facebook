import ThreadModel from '../models/thread.js';

const Thread = class Thread {
  constructor(app, connect) {
    this.app = app;
    this.ThreadModel = connect.model('Thread', ThreadModel);

    this.run();
  }

  create() {
    this.app.post('/thread/create', (req, res) => {
      try {

        const ThreadModel = new this.ThreadModel(req.body);

        ThreadModel.save().then((thread) => {

          res.status(200).json(thread || {});

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
    this.app.get('/thread/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.ThreadModel.findById(req.params.id).then((thread) => {
          res.status(200).json(thread || {});
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
    this.app.delete('/thread/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.ThreadModel.deleteOne({ "_id": req.params.id }).then((thread) => {
          res.status(200).json(thread || {});
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

  addMessage() {
    this.app.post('/thread/:id/message/add', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });
          return;
        }
        this.ThreadModel.updateMany({ _id: req.params.id }, {
          $push: {
            messages: req.body.messages
          }
        }, { upsert: true }).then((thread) => {
          res.status(200).json(thread || {});
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

  addComment() {
    this.app.post('/thread/:id/comment/:idMessage', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.ThreadModel.updateMany(
          { '_id': req.params.id, 'messages._id': req.params.idMessage },
          { $push: { 'messages.$.comments': req.body.comments } },
          { upsert: true }).then((event) => {

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


  // deleteMessage() {
  //   this.app.post('/thread/:id/message/delete/:idMessage', (req, res) => {
  //     try {
  //       if (!req.params.id && !req.params.idMessage) {
  //         res.status(400).json({
  //           status: 400,
  //           message: 'bad request: Please use a id in the query string parameters'
  //         });

  //         return;
  //       }

  //       this.ThreadModel.updateOne({ _id: req.params.id }, {
  //         $pullAll: {
  //           "messages.$._id": req.params.idMessage
  //         }
  //       }).then((thread) => {
  //         res.status(200).json(thread || {});
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
    this.findOne();
    this.read();
    this.delete();
    this.addMessage();
    this.addComment();
    this.deleteMessage();
  }
}

export default Thread;