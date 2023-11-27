import express from 'express';
import cors from 'cors';
import Router from '../router/index.routes';

const middleware = express();

middleware.use(
  session({
    secret: 'asdasdasdasd',
    resave: false,
    saveUninitialized: true,
  })
);
middleware.use(cors());
middleware.use(express.urlencoded({ extended: true }));
middleware.use(express.json());
middleware.use('/', Router);

export default middleware;
