import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/CustomRequest';

export const roleMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.role || '')) {
      res.status(403).json({ message: 'Acceso denegado' });
      return; // Asegúrate de terminar el flujo aquí
    }
    next();
  };
};
