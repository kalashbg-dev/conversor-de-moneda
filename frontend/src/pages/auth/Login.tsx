import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Input, Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import type { LoginCredentials } from '@/types/auth';
import { toast } from 'sonner';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>({
    resolver: yupResolver(schema)
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
      toast.success('Login successful!');
      navigate('/');
    } catch (err: unknown) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl border border-surface-200 dark:border-gray-700">
        <CardHeader className="flex flex-col gap-3 bg-primary-50 dark:bg-gray-900 border-b border-surface-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-center w-full py-2 dark:text-white">Welcome Back</h1>
        </CardHeader>
        <CardBody className="px-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              {...register('username')}
              label="Username"
              variant="bordered"
              errorMessage={errors.username?.message}
              classNames={{
                label: "text-sm font-medium text-default-700 dark:text-gray-300",
                input: "text-sm dark:text-white",
                inputWrapper: "border-surface-300 dark:border-gray-600 hover:border-primary-500 focus-within:!border-primary-500",
              }}
            />
            <Input
              {...register('password')}
              label="Password"
              variant="bordered"
              errorMessage={errors.password?.message}
              type={isVisible ? "text" : "password"}
              classNames={{
                label: "text-sm font-medium text-default-700 dark:text-gray-300",
                input: "text-sm dark:text-white",
                inputWrapper: "border-surface-300 dark:border-gray-600 hover:border-primary-500 focus-within:!border-primary-500",
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
              className="bg-primary-600 dark:bg-primary-500 text-white font-medium"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
            <p className="text-center text-sm text-default-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/users/register" className="text-primary-600 dark:text-primary-400 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}