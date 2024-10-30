import express, { Application } from 'express';
import exchangeRateRoutes from './routes/exchangeRateRoutes';
// import { corsMiddleware } from './middleware/corsConfig';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import conversionRoutes from './routes/conversionRoutes';

const app: Application = express();

/* Middlewares y rutas */

// json middleware
app.use(express.json());

// cors middleware
app.use(cors());

// Routes
app.use('/api/exchange-rates', exchangeRateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/conversions', conversionRoutes);

export default app;