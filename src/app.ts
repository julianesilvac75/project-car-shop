import express from 'express';
import carRouter from './routes/carRouter';

const app = express();
app.use(carRouter);

export default app;
