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
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody
} from '@nextui-org/react';
import { Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/services/api/users';
import type { User } from '@/types/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export default function UsersTable({ users, onEdit }: UsersTableProps) {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    return userApi.delete(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('User deleted successfully');
    handleCloseDeleteModal();
  },
  onError: (error: any) => {
    if (error.response?.status === 401) {
      logout();
      navigate('/users/login');
    } else {
      toast.error(error.response?.data?.error || 'Failed to delete user');
    }
  }
});

  const handleDeleteClick = (user: User) => {
    setDeleteModal({
      isOpen: true,
      user
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.user) {
      deleteMutation.mutate(deleteModal.user._id);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      user: null
    });
  };

  return (
    <>
      <Table 
        aria-label="Users table"
        classNames={{
          td: "text-default-700 dark:text-default-300",
          th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400"
        }}
      >
        <TableHeader>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn align="center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No users found">
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color={user.role === 'admin' ? 'warning' : 'primary'}
                >
                  {user.role.toUpperCase()}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  variant="flat"
                  color={user.isConfirmed ? 'success' : 'danger'}
                >
                  {user.isConfirmed ? 'CONFIRMED' : 'PENDING'}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Tooltip content="Edit user" color="warning">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => onEdit(user)}
                      className="text-warning-500 hover:text-warning-600"
                    >
                      <Pencil size={18} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete user" color="danger">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleDeleteClick(user)}
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
            <span className="text-danger">Delete User</span>
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
                  Are you sure you want to delete user{' '}
                  <span className="font-semibold">
                    {deleteModal.user?.username}
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