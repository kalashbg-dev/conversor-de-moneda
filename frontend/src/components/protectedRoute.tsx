import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Roles } from '@/constants/roles';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Array<keyof typeof Roles>;
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/users/login" />;
  }

  if (roles && !roles.includes(role as keyof typeof Roles)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}