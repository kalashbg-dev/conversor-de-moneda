import cors, { CorsOptions } from 'cors';

const getAllowedOrigins = (origins: string[]): CorsOptions['origin'] => (origin, callback) => {
    if (origins.includes(origin ?? '') || !origin) {
        callback(null, true); // Permitir la solicitud
    } else {
        callback(new Error('Not allowed by CORS')); // Denegar la solicitud
    }
};

export const corsMiddleware = cors({
    origin: getAllowedOrigins(['http://localhost:3000', 'http://localhost:4000']),
    optionsSuccessStatus: 200 // Para algunos navegadores
});
