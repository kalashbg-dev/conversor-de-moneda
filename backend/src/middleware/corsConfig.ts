import cors, { CorsOptions } from 'cors';

const getAllowedOrigins = (origins: string[]): CorsOptions['origin'] => (origin, callback) => {
  if (origins.includes(origin ?? '') || !origin) {
    callback(null, true); // Permitir la solicitud
  } else {
    callback(new Error('Not allowed by CORS')); // Denegar la solicitud
  }
};

export const corsMiddleware = cors({
  origin:'*',
  optionsSuccessStatus: 200, // Para algunos navegadores
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});