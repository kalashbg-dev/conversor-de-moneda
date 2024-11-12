import { deleteInactiveUsers } from './deleteInactiveUsers';

const scheduler = () => {
  setInterval(() => {
    deleteInactiveUsers();
  }, 60000); // 60000 milisegundos = 1 minuto
};

scheduler();