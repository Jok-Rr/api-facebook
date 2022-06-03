import SurveyModel from '../models/survey.js';

const Survey = class Survey {
  constructor(app, connect) {
    this.app = app;
    this.SurveyModel = connect.model('Survey', SurveyModel);

    this.run();
  }

  create() {
    this.app.post('/survey/create', (req, res) => {
      try {

        const SurveyModel = new this.SurveyModel(req.body);

        SurveyModel.save().then((survey) => {

          res.status(200).json(survey || {});

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
    this.app.get('/survey/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.SurveyModel.findById(req.params.id).then((survey) => {
          res.status(200).json(survey || {});
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
    this.app.put('/survey/update/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.SurveyModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then((event) => {
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
    this.app.delete('/survey/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.SurveyModel.deleteOne({ "_id": req.params.id }).then((survey) => {
          res.status(200).json(survey || {});
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

  addReply() {
    this.app.post('/survey/:id/reply/add', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });
          return;
        }
        this.SurveyModel.updateMany({ _id: req.params.id }, {
          $push: {
            replys: req.body.replys
          }
        }, { upsert: true }).then((survey) => {
          res.status(200).json(survey || {});
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
    this.update();
    this.read();
    this.delete();
    this.addReply();
  }
}

export default Survey;