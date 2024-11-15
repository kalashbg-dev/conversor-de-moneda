import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Input, Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import type { RegisterData } from '@/types/auth';
import { toast } from 'sonner';

const schema = yup.object({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Must be a valid email'),
  name: yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
}).required();

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  
  const { register: registerField, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
    resolver: yupResolver(schema)
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: RegisterData) => {
    try {
      await register(data);
      toast.success('Registration successful! Please check your email to confirm your account.');
      setTimeout(() => navigate('/users/login'), 3000);
    } catch (err: unknown) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-white shadow-2xl border border-surface-200">
        <CardHeader className="flex flex-col gap-3 bg-primary-50 border-b border-surface-200">
          <h1 className="text-xl font-semibold text-center w-full py-2">Create Account</h1>
        </CardHeader>
        <CardBody className="px-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              {...registerField('username')}
              label="Username"
              variant="bordered"
              errorMessage={errors.username?.message}
              classNames={{
                label: "text-sm font-medium text-default-700",
                input: "text-sm",
                inputWrapper: "border-surface-300 hover:border-primary-500 focus-within:!border-primary-500",
              }}
            />
            <Input
              {...registerField('email')}
              type="email"
              label="Email"
              variant="bordered"
              errorMessage={errors.email?.message}
              classNames={{
                label: "text-sm font-medium text-default-700",
                input: "text-sm",
                inputWrapper: "border-surface-300 hover:border-primary-500 focus-within:!border-primary-500",
              }}
            />
            <Input
              {...registerField('name')}
              label="Full Name"
              variant="bordered"
              errorMessage={errors.name?.message}
              classNames={{
                label: "text-sm font-medium text-default-700",
                input: "text-sm",
                inputWrapper: "border-surface-300 hover:border-primary-500 focus-within:!border-primary-500",
              }}
            />
            <Input
              {...registerField('password')}
              label="Password"
              variant="bordered"
              errorMessage={errors.password?.message}
              type={isVisible ? "text" : "password"}
              classNames={{
                label: "text-sm font-medium text-default-700",
                input: "text-sm",
                inputWrapper: "border-surface-300 hover:border-primary-500 focus-within:!border-primary-500",
              }}
              endContent={
                <button
                  className="focus:outline-none text-default-400 hover:text-primary-500"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
            />
            <Button
              type="submit"
              className="bg-primary-600 text-white font-medium"
              isLoading={isSubmitting}
            >
              Sign Up
            </Button>
            <p className="text-center text-sm text-default-500">
              Already have an account?{' '}
              <Link href="/users/login" className="text-primary-600 font-medium">
                Sign In
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}