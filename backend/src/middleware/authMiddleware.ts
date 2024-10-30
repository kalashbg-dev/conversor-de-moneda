// middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import { CustomRequest } from '../types/CustomRequest';

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token requerido' });
    return; 
  }

  try {
    const decoded = verifyToken(token);
    req.userId = (decoded as any).id;

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    if (!user.isConfirmed) { // Verificar si el correo ha sido confirmado
      res.status(403).json({ message: 'Correo no confirmado' });
      return;
    }

    req.role = user.role; // Puedes almacenar el rol del usuario si es necesario
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
