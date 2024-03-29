import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import carRouter from './routes/carRouter';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(errorMiddleware);

export default app;
