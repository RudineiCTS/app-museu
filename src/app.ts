import 'reflect-metadata';
import 'dotenv/config';
import './database';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import uploadConfig from './config/upload';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
