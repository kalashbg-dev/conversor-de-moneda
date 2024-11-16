import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, Button } from '@nextui-org/react';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

export default function EmailConfirm() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const { data }: { data: { message: string } } = await api.get(`/users/confirm-email/${userId}`);
        setStatus('success');
        setMessage(data.message);
        toast.success('Email confirmed successfully');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setStatus('error');
          setMessage(error.message);
          toast.error('Failed to confirm email');
        } else {
          console.error('An unknown error occurred:', error);
        }
      }
    };

    confirmEmail();
  }, [userId]);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-white shadow-2xl border border-surface-200">
        <CardBody className="flex flex-col items-center gap-4 p-6">
          <div className="w-full bg-primary-50 py-4 -mt-6 -mx-6 mb-6 border-b border-surface-200">
            <h1 className="text-xl font-semibold text-center">Email Confirmation</h1>
          </div>
          
          {status === 'loading' && (
            <p className="text-default-500">Confirming your email...</p>
          )}
          
          {status === 'success' && (
            <>
              <p className="text-success">{message}</p>
              <Button
                className="bg-primary-600 text-white font-medium"
                onClick={() => navigate('/auth/login')}
              >
                Go to Login
              </Button>
            </>
          )}
          
          {status === 'error' && (
            <>
              <p className="text-danger">{message}</p>
              <Button
                className="bg-primary-600 text-white font-medium"
                onClick={() => navigate('/auth/login')}
              >
                Back to Login
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}