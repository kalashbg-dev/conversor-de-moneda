import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Chip,
  Tooltip
} from '@nextui-org/react';
import { Building2 } from 'lucide-react';
import type { ExchangeRateHistory } from '@/services/api/exchangeRateHistory';

interface ExchangeRateHistoryTableProps {
  history: ExchangeRateHistory[];
}

export default function ExchangeRateHistoryTable({ history }: ExchangeRateHistoryTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Table 
      aria-label="Exchange rate history table"
      classNames={{
        wrapper: "shadow-md",
        th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400",
        td: "text-default-700 dark:text-default-300"
      }}
    >
      <TableHeader>
        <TableColumn>TYPE</TableColumn>
        <TableColumn>FROM</TableColumn>
        <TableColumn>TO</TableColumn>
        <TableColumn>RATE</TableColumn>
        <TableColumn>INSTITUTION</TableColumn>
        <TableColumn>DATE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No history found">
        {history.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <Chip
                size="sm"
                variant="flat"
                color={item.institution ? "warning" : "success"}
              >
                {item.institution ? 'Institutional' : 'General'}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip size="sm" variant="flat" color="primary">
                {item.currencyFrom}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip size="sm" variant="flat" color="secondary">
                {item.currencyTo}
              </Chip>
            </TableCell>
            <TableCell className="font-medium">
              {Number(item.exchangeRate).toFixed(4)}
            </TableCell>
            <TableCell>
              {item.institution ? (
                <Tooltip content={item.institution.name}>
                  <div className="flex items-center gap-2 text-warning-500">
                    <Building2 size={16} />
                    <span className="text-sm">{item.institution.name}</span>
                  </div>
                </Tooltip>
              ) : (
                <span className="text-sm text-default-400">-</span>
              )}
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {formatDate(item.date)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}