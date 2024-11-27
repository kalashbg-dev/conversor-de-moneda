import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from '@nextui-org/react';
import { ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExchangeRateCard } from './ExchangeRateCard';
import type { ExchangeRate } from '@/types/api';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';


interface ExchangeRatesGridProps {
  rates: ExchangeRate[];
}

// Definir el tipo para los items del menú
type MenuItem = {
  key: string;
  content: ReactNode;
};

export function ExchangeRatesGrid({ rates }: ExchangeRatesGridProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();

  
  const filteredRates: ExchangeRate[] = rates.filter(rate => {
    return (rate.currencyFrom as string)?.includes(searchQuery.toUpperCase()) || (rate.currencyTo as string)?.includes(searchQuery.toUpperCase());
  });

  const handleRateSelect = (rateId: string) => {
    navigate(`/exchange-rates/${rateId}`);
  };

  // Crear un componente personalizado para los DropdownItems
  const RateDropdownItem = ({ rate, onClick }: { 
    rate: ExchangeRate; 
    onClick: () => void;
  }) => (
    <DropdownItem 
      key={rate._id}
      onClick={onClick}
    >
      <div className="flex flex-col py-1 items-center text-center">
        <div className="flex justify-between">
          <span className="font-medium text-black">
            {rate.currencyFrom} → {rate.currencyTo}
          </span>
        </div>
      </div>
    </DropdownItem>
  );

  // Crear los items del menú
  const menuItems: MenuItem[] = [
    {
      key: 'search',
      content: (
        <Input
          placeholder={t('available_rates.currency_selector.search_label')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search size={18} className="text-default-400" />}
          classNames={{
            input: "text-medium",
            inputWrapper: "h-10"
          }}
          size="sm"
        />
      )
    },
    ...filteredRates.map((rate) => ({
      key: rate._id,
      content: (
        <RateDropdownItem 
          rate={rate}
          onClick={() => handleRateSelect(rate._id)}
        />
      )
    }))
  ];

  if (filteredRates.length === 0) {
    menuItems.push({
      key: 'no-results',
      content: (
        <DropdownItem className="text-default-500" isReadOnly>
          No exchange rates found
        </DropdownItem>
      )
    });
  }

  return (
    <div className="space-y-6">
      {/* Mobile Dropdown */}
      <div className="sm:hidden w-full">
        <Dropdown 
          isOpen={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          className="w-full"
        >
          <DropdownTrigger>
            <Button
              variant="flat"
              className="w-full h-12"
              endContent={<ChevronDown />}
            >
            {t('available_rates.currency_selector.label')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Exchange rates"
            className="w-[calc(100vw-175px)]"
            closeOnSelect={true}
          >
            {menuItems.map(item => (
              <DropdownItem key={item.key} isReadOnly={item.key === 'search' || item.key === 'no-results'}>
                {item.content}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRates.map((rate) => (
          <ExchangeRateCard key={rate._id} rate={rate} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredRates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No exchange rates found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}