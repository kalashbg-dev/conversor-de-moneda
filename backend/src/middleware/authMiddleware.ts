// backend/src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';
import { CustomRequest } from '../types/CustomRequest';

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token sin el prefijo "Bearer"

  if (!token) {
    res.status(403).json({ message: 'Token requerido' });
    return; 
  }

  try {
    // Verificar y decodificar el token
    const decoded = verifyToken(token);
    req.userId = (decoded as any).id;

    // Buscar al usuario en la base de datos
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Verificar si el correo ha sido confirmado
    if (!user.isConfirmed) {
      res.status(403).json({ message: 'Correo no confirmado' });
      return;
    }

    // Almacenar el rol del usuario para futuros permisos
    req.role = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
