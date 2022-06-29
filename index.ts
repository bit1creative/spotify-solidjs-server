import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import spotifyAuthRouter from './routes/spotifyAuthRouter';

const app: Express = express();
const port = process.env.PORT;

app.use('/spotify', spotifyAuthRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
