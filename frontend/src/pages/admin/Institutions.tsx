import { useState, useCallback, useEffect } from 'react';
import { 
  Button,
  useDisclosure,
  Spinner,
  Card,
  CardBody,
  Tooltip
} from '@nextui-org/react';
import { Plus, Building2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { institutionApi } from '@/services/api/institutions';
import InstitutionModal from '@/components/admin/InstitutionModal';
import InstitutionsTable from '@/components/admin/InstitutionsTable';
import type { Institution } from '@/types/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export default function Institutions() {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const { data: institutions = [], isLoading, error } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      const response = await institutionApi.getAll();
      return response.data;
    }
  });

  if (error) {
    const errorResponse = error as { response?: { status?: number } };
    if (errorResponse.response?.status === 401) {
      logout();
      navigate('/users/login');
    }
    toast.error(error.message || 'Failed to load institutions');
  }

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return institutionApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      toast.success('Institution deleted successfully');
    }
  });
  
  if (error) {
    const errorResponse = error as { response?: { status?: number } };
    if (errorResponse.response?.status === 401) {
      logout();
      navigate('/users/login');
    }
    toast.error(error.message || 'Failed to load institution');
  }

  const handleEdit = (institution: Institution) => {
    setSelectedInstitution(institution);
    onOpen();
  };

  const handleAdd = useCallback(() => {
    setSelectedInstitution(null);
    onOpen();
  }, [onOpen]);

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        handleAdd();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleAdd]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Card>
          <CardBody className="py-8 px-12 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-danger/10">
              <Building2 className="text-danger" size={24} />
            </div>
            <p className="text-danger text-lg font-medium">
            {(error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to load institutions'}
            </p>
            <Button 
              color="success"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['institutions'] })}
            >
              Try Again
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardBody className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/20">
              <Building2 className="text-primary-500" size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Institutions
            </h1>
          </div>
          <Tooltip content="Press Ctrl+N to create new (⌘+N on Mac)">
            <Button
              color="success"
              startContent={<Plus size={20} />}
              onPress={handleAdd}
              size="lg"
              className="bg-success-500 hover:bg-success-600 text-white font-medium px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create Institution
            </Button>
          </Tooltip>
        </CardBody>
      </Card>

      {institutions.length === 0 ? (
        <Card className="mt-8">
          <CardBody className="py-12 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-success-50 dark:bg-success-900/20">
              <Building2 className="text-success-500" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              No Institutions Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              Get started by creating your first institution. Click the button above or press Ctrl+N (⌘+N on Mac).
            </p>
            <Button
              color="success"
              startContent={<Plus size={20} />}
              onPress={handleAdd}
              size="lg"
              className="mt-4 bg-success-500 hover:bg-success-600 text-white font-medium px-8"
            >
              Create First Institution
            </Button>
          </CardBody>
        </Card>
      ) : (
        <InstitutionsTable 
          institutions={institutions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <InstitutionModal
        institution={selectedInstitution}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}