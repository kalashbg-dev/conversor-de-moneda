import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Chip,
  // Link
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import type { ExchangeRate } from '@/types/api';

interface ExchangeRatesTableProps {
  rates: ExchangeRate[];
}

export default function ExchangeRatesTable({ rates }: ExchangeRatesTableProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Table 
      aria-label="Exchange rates table"
      classNames={{
        wrapper: "shadow-sm",
        th: "bg-default-100 text-default-600",
        td: "text-default-700"
      }}
    >
      <TableHeader>
        <TableColumn>FROM</TableColumn>
        <TableColumn>TO</TableColumn>
        <TableColumn>RATE</TableColumn>
        <TableColumn>LAST UPDATE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No exchange rates found">
        {rates.map((rate) => (
          <TableRow 
            key={rate._id}
            className="cursor-pointer"
            onClick={() => navigate(`/exchange-rates/${rate._id}`)}
          >
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
            <TableCell className="font-medium">
              {rate.exchangeRate.toFixed(4)}
            </TableCell>
            <TableCell>
            {formatDate(rate.updatedAt?.toString() ?? '')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}