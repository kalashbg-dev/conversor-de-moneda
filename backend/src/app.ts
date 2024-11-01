import express, { Application } from 'express'
import exchangeRateRoutes from './routes/exchangeRateRoutes'
// import { corsMiddleware } from './middleware/corsConfig';
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import conversionRoutes from './routes/conversionRoutes'

const app: Application = express()

/* Middlewares y rutas */

// json middleware
app.use(express.json())

// cors middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // to allow all origins for now
    if (/* (origin && allowedOrigins.includes(origin)) */ 1 === 1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

// Routes
app.use('/api/exchange-rates', exchangeRateRoutes)
app.use('/api/users', userRoutes)
app.use('/api/conversions', conversionRoutes)

export default app
