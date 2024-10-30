import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import { CustomRequest } from '../types/CustomRequest';

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token requerido' });
    return; // Asegúrate de terminar aquí para evitar llamadas redundantes a next()
  }

  try {
    const decoded = verifyToken(token);
    req.userId = (decoded as any).id;

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    req.role = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
