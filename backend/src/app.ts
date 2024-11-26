import express, { Application } from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import { corsMiddleware } from "./middleware/corsConfig";
import userRoutes from "./routes/userRoutes";
import conversionRoutes from "./routes/conversionRoutes";
import exchangeRateHistoryRoutes from "./routes/exchangeRateHistoryRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import institutionExchangeRateRoutes from "./routes/institutionExchangeRateRoutes";
import { connectDB } from "./config/database";
import swaggerDocs from "./config/swagger";

const app: Application = express();

/* Middlewares y rutas */
app.use(express.json());
app.use(corsMiddleware);

// Conectar a la base de datos
connectDB();

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Exchange Rate API',
    docs: '/api-docs'
  });
});

// Routes
app.use("/api/exchange-rates", exchangeRateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);
app.use("/api/exchange-rate-history", exchangeRateHistoryRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/institutions-exchange-rates", institutionExchangeRateRoutes);

// Swagger docs
swaggerDocs(app);

export default app;
