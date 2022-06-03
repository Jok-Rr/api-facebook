import GalleryModel from '../models/gallery.js';

const Gallery = class Gallery {
  constructor(app, connect) {
    this.app = app;
    this.GalleryModel = connect.model('Gallery', GalleryModel);

    this.run();
  }

  create() {
    this.app.post('/gallery/create', (req, res) => {
      try {

        const GalleryModel = new this.GalleryModel(req.body);

        GalleryModel.save().then((gallery) => {

          res.status(200).json(gallery || {});

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
    this.app.get('/gallery/view/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GalleryModel.findById(req.params.id).then((gallery) => {
          res.status(200).json(gallery || {});
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
    this.app.put('/gallery/update/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GalleryModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { upsert: true }).then((gallery) => {
          res.status(200).json(gallery || {});
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
    this.app.delete('/gallery/delete/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GalleryModel.deleteOne({ "_id": req.params.id }).then((gallery) => {
          res.status(200).json(gallery || {});
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

  addPhoto() {
    this.app.post('/gallery/:id/photo/add', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });
          return;
        }
        this.GalleryModel.updateMany({ _id: req.params.id }, {
          $push: {
            album: req.body.album
          }
        }, { upsert: true }).then((gallery) => {
          res.status(200).json(gallery || {});
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
    this.app.post('/gallery/:id/comment/:idPhoto', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'bad request: Please use a id in the query string parameters'
          });

          return;
        }

        this.GalleryModel.updateMany(
          { '_id': req.params.id, 'album._id': req.params.idPhoto },
          { $push: { 'album.$.comments': req.body.comments } },
          { upsert: true }).then((gallery) => {

            res.status(200).json(gallery || {});

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
    this.addPhoto();
    this.addComment();
  }
}

export default Gallery;