import express, { Application } from 'express';
import exchangeRateRoutes from './routes/exchangeRateRoutes';
import { corsMiddleware } from './middleware/corsConfig';
import userRoutes from './routes/userRoutes';

const app: Application = express();

/* Middlewares y rutas */

// json middleware
app.use(express.json());

// cors middleware
app.use(corsMiddleware);

// Routes
app.use('/api/exchange-rates', exchangeRateRoutes);
app.use('/api/users', userRoutes);

export default app;