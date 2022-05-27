import UserModel from '../models/user.js';
import crypto from 'crypto';

const User = class User {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);

    this.run();
  }

  create() {
    this.app.post('/user/create', (req, res) => {
      try {

        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;

        const UserModel = new this.UserModel(req.body);

        UserModel.save().then((user) => {

          res.status(200).json(user || {});

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
    this.app.get('/user/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.UserModel.findById(req.params.id).then((user) => {
          res.status(200).json(user || {});
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
    this.app.put('/user/update/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;

        this.UserModel.updateOne({ _id: req.params.id }, { $set: req.body }).then((user) => {
          res.status(200).json(user || {});
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
    this.app.delete('/user/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.UserModel.deleteOne({ "_id": req.params.id }).then((user) => {
          res.status(200).json(user || {});
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
    this.update();
    this.delete();
  }
}

export default User;