// Dependencies
import express from 'express';
import mongoose from 'mongoose';

//Dependencies middleware

//Core 
import config from './config.js';
import routes from './controllers/routes.js';

class Server {
  constructor() {
    this.app = express();
    this.config = config[process.argv[2]] || config.development;
  }

  middleware() {
    // this.app.use(bodyParser.urlencoded({ extended: true }));
    // this.app.use(bodyParser.json);
    this.app.use(express.json());
  }

  dbConnect() {

    const { mongodb } = this.config;
    const connect = mongoose.createConnection(mongodb);

    connect.on('error', (err) => {

      setTimeout(() => {
        console.log('[ERROR] Api dbConnect() -> mongodb error');
        this.connect = this.dbConnect(mongodb);
      }, 5000);
    });

    connect.on('disconnected', (err) => {
      setTimeout(() => {
        console.log('[DISCONNECTED] Api dbConnect() -> mongodb disconnected');
        this.connect = this.dbConnect(mongodb);
      }, 5000);

      console.error(`[ERROR] Api dbConnect() -> ${err}`);
    });

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] Api dbConnect() -> close mongodb connection');
        process.exit(0);
      });
    });

    return connect;
  }

  routes() {
    new routes.User(this.app, this.connect);
    new routes.Group(this.app, this.connect);

    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: 'Not Found !'
      })
    })
  }

  run() {
    try {
      this.connect = this.dbConnect();
      this.middleware();
      this.routes();
      this.app.listen(this.config.port);
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`);
    }
  }
}

export default Server;