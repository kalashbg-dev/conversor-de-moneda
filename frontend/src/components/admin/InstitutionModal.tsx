import { useEffect } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Building2 } from 'lucide-react';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { institutionApi } from '@/services/api/institutions';
import type { Institution } from '@/types/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const schema = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  country: yup.string()
    .nullable()
    .default(null)
}).required();

interface InstitutionModalProps {
  institution: Institution | null;
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  country: string | null;
};

export default function InstitutionModal({ 
  institution, 
  isOpen, 
  onClose 
}: InstitutionModalProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      country: ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (institution) {
        return institutionApi.update(institution._id, data);
      }
      return institutionApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      toast.success(`Institution ${institution ? 'updated' : 'created'} successfully`);
      handleClose();
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        logout();
        navigate('/users/login');
      } else {
        toast.error(error.response?.data?.error || `Failed to ${institution ? 'update' : 'create'} institution`);
      }
    }
  });

  useEffect(() => {
    if (institution) {
      reset({
        name: institution.name,
        country: institution.country || ''
      });
    } else {
      reset({
        name: '',
        country: ''
      });
    }
  }, [institution, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-white dark:bg-gray-900",
        header: "border-b border-[#292f46]",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <span className={institution ? "text-warning-500" : "text-success-500"}>
              {institution ? 'Edit Institution' : 'Add New Institution'}
            </span>
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="gap-4">
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full ${
                    institution 
                      ? "bg-warning-100 dark:bg-warning-900/20" 
                      : "bg-success-100 dark:bg-success-900/20"
                  }`}>
                    <Building2 className={
                      institution 
                        ? "text-warning-500" 
                        : "text-success-500"
                    } size={24} />
                  </div>
                </div>
                <Input
                  {...register('name')}
                  label="Institution Name"
                  variant="bordered"
                  errorMessage={errors.name?.message}
                  isDisabled={isSubmitting}
                  classNames={{
                    label: "text-sm font-medium text-default-700 dark:text-gray-300",
                    input: "text-sm dark:text-white",
                    inputWrapper: "border-surface-300 dark:border-gray-600 hover:border-success-500 focus-within:!border-success-500",
                  }}
                />
                <Input
                  {...register('country')}
                  label="Country"
                  variant="bordered"
                  errorMessage={errors.country?.message}
                  isDisabled={isSubmitting}
                  classNames={{
                    label: "text-sm font-medium text-default-700 dark:text-gray-300",
                    input: "text-sm dark:text-white",
                    inputWrapper: "border-surface-300 dark:border-gray-600 hover:border-success-500 focus-within:!border-success-500",
                  }}
                />
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="flat"
              onPress={handleClose}
              isDisabled={isSubmitting}
              className="bg-gray-100 dark:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className={
                institution 
                  ? "bg-warning-500 text-white hover:bg-warning-600" 
                  : "bg-success-500 text-white hover:bg-success-600"
              }
            >
              {institution ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}