import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { Roles } from '../constants/roles';

// Helper function to handle responses
const handleResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json(data);
};

// Helper function to handle errors
const handleError = (res: Response, error: any, message: string) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

// Hash password function
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Validate password function
const validatePassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, password: hashedPassword, role: role || Roles.USER });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Usuario no encontrado');
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const isPasswordValid = await validatePassword(password, user.password);
    console.log('¿La contraseña es válida?', isPasswordValid);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, role: user.role });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    handleResponse(res, 200, users);
  } catch (error) {
    handleError(res, error, 'Error al obtener los usuarios');
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return handleResponse(res, 404, { error: 'Usuario no encontrado' });
    }
    handleResponse(res, 200, user);
  } catch (error) {
    handleError(res, error, 'Error al obtener el usuario');
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return handleResponse(res, 404, { error: 'Usuario no encontrado' });
    }
    handleResponse(res, 200, updatedUser);
  } catch (error) {
    handleError(res, error, 'Error al actualizar el usuario');
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return handleResponse(res, 404, { error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error, 'Error al eliminar el usuario');
  }
};
