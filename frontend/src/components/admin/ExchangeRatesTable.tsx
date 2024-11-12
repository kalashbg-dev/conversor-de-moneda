import { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Chip,
  // Spinner
} from '@nextui-org/react';
import { Pencil, Trash2, AlertTriangle, Copy } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { institutionExchangeRateApi } from '@/services/api/institutionExchangeRates';
import type { InstitutionExchangeRate } from '@/services/api/institutionExchangeRates';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ExchangeRatesTableProps {
  rates: InstitutionExchangeRate[];
  onEdit: (rate: InstitutionExchangeRate) => void;
}

export default function ExchangeRatesTable({ rates, onEdit }: ExchangeRatesTableProps) {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    rate: InstitutionExchangeRate | null;
  }>({
    isOpen: false,
    rate: null
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return institutionExchangeRateApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution-exchange-rates'] });
      toast.success('Exchange rate deleted successfully');
      handleCloseDeleteModal();
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        logout();
        navigate('/users/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete exchange rate');
      }
    }
  });

  const handleDeleteClick = (rate: InstitutionExchangeRate) => {
    setDeleteModal({
      isOpen: true,
      rate
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.rate) {
      deleteMutation.mutate(deleteModal.rate._id);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      rate: null
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('ID copied to clipboard');
  };

  if (!Array.isArray(rates)) {
    console.error('Rates is not an array:', rates);
    return null;
  }

  return (
    <>
      <Table 
        aria-label="Exchange rates table"
        classNames={{
          wrapper: "shadow-md",
          td: "text-default-700 dark:text-default-300",
          th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400"
        }}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>FROM</TableColumn>
          <TableColumn>TO</TableColumn>
          <TableColumn>RATE</TableColumn>
          <TableColumn>INSTITUTION</TableColumn>
          <TableColumn>LAST UPDATE</TableColumn>
          <TableColumn align="center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No exchange rates found">
          {rates.map((rate) => (
            <TableRow key={rate._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">{rate._id}</span>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => copyToClipboard(rate._id)}
                    className="text-default-400 hover:text-primary-500"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="primary">
                  {rate.currencyFrom}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="secondary">
                  {rate.currencyTo}
                </Chip>
              </TableCell>
              <TableCell className="font-medium">{Number(rate.exchangeRate).toFixed(4)}</TableCell>
              <TableCell>
                {rate.institution?.name || 'Unknown Institution'}
              </TableCell>
              <TableCell>{formatDate(rate.updatedAt)}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Tooltip content="Edit rate" color="warning">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => onEdit(rate)}
                      className="text-warning-500 hover:text-warning-600"
                    >
                      <Pencil size={18} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete rate" color="danger">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleDeleteClick(rate)}
                      className="text-danger hover:text-danger-600"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal 
        isOpen={deleteModal.isOpen} 
        onClose={handleCloseDeleteModal}
        size="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-white dark:bg-gray-900",
          header: "border-b border-[#292f46]",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span className="text-danger">Delete Exchange Rate</span>
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="gap-4">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-danger/10">
                    <AlertTriangle className="text-danger" size={24} />
                  </div>
                </div>
                <p className="text-center text-default-700 dark:text-gray-300">
                  Are you sure you want to delete the exchange rate{' '}
                  <span className="font-semibold">
                    {deleteModal.rate?.currencyFrom} to {deleteModal.rate?.currencyTo}
                  </span>
                  ?
                </p>
                <p className="text-center text-small text-default-500">
                  This action cannot be undone.
                </p>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="light" 
              onPress={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleConfirmDelete}
              isLoading={deleteMutation.isPending}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}