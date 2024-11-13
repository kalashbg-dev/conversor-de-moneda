import { Card, CardBody } from '@nextui-org/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ExchangeRate } from '@/types/api';

interface ExchangeRateCardProps {
  rate: ExchangeRate;
}

export function ExchangeRateCard({ rate }: ExchangeRateCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:scale-105 transition-transform duration-200 cursor-pointer"
      isPressable
      onPress={() => navigate(`/exchange-rates/${rate._id}`)}
    >
      <CardBody className="p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-3 w-full">
            <span className="text-lg font-semibold">{rate.currencyFrom}</span>
            <ArrowRight size={20} className="text-default-400" />
            <span className="text-lg font-semibold">{rate.currencyTo}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}