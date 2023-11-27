import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
// import server from './Middlewares/index.Middleware';
import session from 'express-session';
import cors from 'cors';
import Router from './router/index.routes';

const server = express();
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use((req, _, next) => {
  server.locals.token = req.session.token;
  req.token = server.locals.token;

  next();
});
server.use('/', Router);
server.listen(process.env.PORT, () => {
  console.log(
    `:: \x1b[36mSERVER\x1b[0m \x1b[33m${process.env.PORT}\x1b[0m \x1b[36mWORKS\x1b[0m ::`
  );
});
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.once('open', () => {
  console.log(
    `:: \x1b[36mDATABASE\x1b[0m \x1b[33m${process.env.MONGODB_URI}\x1b[0m \x1b[36mWORKS\x1b[0m ::`
  );
});
