import { useState } from 'react';
import { 
  Button,
  Spinner,
  Card,
  CardBody,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import { DollarSign, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { institutionExchangeRateApi } from '@/services/api/institutionExchangeRates';
import ExchangeRatesTable from '@/components/admin/exchangeRates/ExchangeRatesTable';
import ExchangeRateModal from '@/components/admin/exchangeRates/ExchangeRateModal';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import type { InstitutionExchangeRate } from '@/types/api';

export default function InstitutionExchangeRates() {
  const [selectedRate, setSelectedRate] = useState<InstitutionExchangeRate | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const { data: rates = [], isLoading, error, refetch } = useQuery<InstitutionExchangeRate[]>({
    queryKey: ['institution-exchange-rates'],
    queryFn: async () => {
      const response = await institutionExchangeRateApi.getAll();
      console.log('Exchange Rates Response:', response.data);
      return response.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  if (error) {
    const errorResponse = error as { response?: { status?: number } };
    if (errorResponse.response?.status === 401) {
      logout();
      navigate('/users/login');
    }
    toast.error(error.message || 'Failed to load exchange rates');
  }

  const handleEdit = (rate: InstitutionExchangeRate) => {
    setSelectedRate(rate);
    onOpen();
  };

  const handleAdd = () => {
    setSelectedRate(null);
    onOpen();
  };

  const handleModalClose = () => {
    setSelectedRate(null);
    onClose();
    refetch();
  };

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
              <DollarSign className="text-danger" size={24} />
            </div>
            <p className="text-danger text-lg font-medium">
              {(error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to load exchange rates'}
            </p>
            <Button 
              color="primary"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  console.log('Rendering with rates:', rates);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardBody className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/20">
              <DollarSign className="text-primary-500" size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Exchange Rates
            </h1>
          </div>
          <Tooltip content="Add new exchange rate">
            <Button
              color="success"
              startContent={<Plus size={20} />}
              onPress={handleAdd}
              size="lg"
              className="bg-success-500 hover:bg-success-600 text-white font-medium px-6 h-12"
            >
              Add Exchange Rate
            </Button>
          </Tooltip>
        </CardBody>
      </Card>

      {Array.isArray(rates) && rates.length === 0 ? (
        <Card className="mt-8">
          <CardBody className="py-12 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-success-50 dark:bg-success-900/20">
              <DollarSign className="text-success-500" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              No Exchange Rates Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              Get started by adding your first exchange rate.
            </p>
            <Button
              color="success"
              startContent={<Plus size={20} />}
              onPress={handleAdd}
              size="lg"
              className="mt-4 bg-success-500 hover:bg-success-600 text-white font-medium px-8"
            >
              Add First Exchange Rate
            </Button>
          </CardBody>
        </Card>
      ) : (
        <ExchangeRatesTable 
          rates={rates}
          onEdit={handleEdit}
        />
      )}

      <ExchangeRateModal
        rate={selectedRate}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}