import GroupModel from '../models/group.js';

const Group = class Group {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupModel);

    this.run();
  }

  create() {
    this.app.post('/group/create', (req, res) => {
      try {

        const GroupModel = new this.GroupModel(req.body);

        GroupModel.save().then((group) => {

          res.status(200).json(group || {});

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
    this.app.get('/group/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GroupModel.findById(req.params.id).then((group) => {
          res.status(200).json(group || {});
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
    this.app.put('/group/update/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GroupModel.updateOne({ _id: req.params.id }, { $set: req.body }).then((group) => {
          res.status(200).json(group || {});
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
    this.app.delete('/group/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GroupModel.deleteOne({ "_id": req.params.id }).then((group) => {
          res.status(200).json(group || {});
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
    this.app.post('/group/:id/member/add/', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GroupModel.updateMany({ _id: req.params.id }, {
          $push: {
            members: req.body.members
          }
        }, { upsert: true }).then((group) => {
          res.status(200).json(group || {});
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

export default Group;