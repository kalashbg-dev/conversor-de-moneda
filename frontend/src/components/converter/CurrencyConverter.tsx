import { useState, useEffect } from 'react';
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Select, 
  SelectItem,
  Spinner,
  Tooltip
} from '@nextui-org/react';
import { ArrowLeftRight, RotateCcw, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useConversion } from './hooks/useConversion';
import { getGMTTime } from './utils';
import type { ExchangeRate, InstitutionExchangeRate } from './types';
import { toast } from 'sonner';
import InputSelector from './InputSelector';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('');
  const [currencyFrom, setCurrencyFrom] = useState<string>('');
  const [currencyTo, setCurrencyTo] = useState<string>('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [baseRate, setBaseRate] = useState<number | null>(null);
  
  const { isAuthenticated } = useAuthStore();
  const debouncedAmount = useDebounce(amount, 500);

  // Fetch general exchange rates
  const { data: generalRates = [], isLoading: isLoadingGeneral } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const response = await api.get('/exchange-rates');
      return response.data as ExchangeRate[];
    }
  });

  // Fetch institutional exchange rates
  const { data: institutionalRates = [], isLoading: isLoadingInstitutional } = useQuery({
    queryKey: ['institution-exchange-rates'],
    queryFn: async () => {
      const response = await api.get('/institutions-exchange-rates');
      return response.data as InstitutionExchangeRate[];
    },
    enabled: isAuthenticated
  });

  // Fetch institutions
  const { data: institutions = [] } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      const response = await api.get('/institutions');
      return response.data;
    },
    enabled: isAuthenticated
  });

  // Get available currencies based on selected institution
  const availableFromCurrencies = (() => {
    if (selectedInstitution) {
      const institutionRates = institutionalRates.filter(
        rate => rate.institution._id === selectedInstitution
      );
      return Array.from(new Set(
        institutionRates.map(rate => rate.currencyFrom)
      )).sort();
    }
    return Array.from(new Set(
      generalRates.map(rate => rate.currencyFrom)
    )).sort();
  })();

  // Get available 'to' currencies based on selected 'from' currency and institution
  const availableToCurrencies = (() => {
    if (!currencyFrom) return [];

    if (selectedInstitution) {
      const institutionRates = institutionalRates.filter(
        rate => 
          rate.institution._id === selectedInstitution &&
          rate.currencyFrom === currencyFrom
      );
      return Array.from(new Set(
        institutionRates.map(rate => rate.currencyTo)
      )).sort();
    }

    return Array.from(new Set(
      generalRates
        .filter(rate => rate.currencyFrom === currencyFrom)
        .map(rate => rate.currencyTo)
    )).sort();
  })();

  const convertMutation = useConversion((data) => {
    setResult(data.result);
    if (data.amount > 0) {
      setBaseRate(data.result / data.amount);
    }
  });

  // Reset currencies when institution changes
  useEffect(() => {
    if (selectedInstitution) {
      const institutionRates = institutionalRates.filter(
        rate => rate.institution._id === selectedInstitution
      );
      
      if (institutionRates.length > 0) {
        const firstRate = institutionRates[0];
        setCurrencyFrom(firstRate.currencyFrom);
        
        const availableTo = institutionRates
          .filter(rate => rate.currencyFrom === firstRate.currencyFrom)
          .map(rate => rate.currencyTo);
        
        if (availableTo.length > 0) {
          setCurrencyTo(availableTo[0]);
        }
      }
    } else {
      if (generalRates.length > 0) {
        setCurrencyFrom(generalRates[0].currencyFrom);
        const availableTo = generalRates
          .filter(rate => rate.currencyFrom === generalRates[0].currencyFrom)
          .map(rate => rate.currencyTo);
        if (availableTo.length > 0) {
          setCurrencyTo(availableTo[0]);
        }
      }
    }
    setResult(null);
    setBaseRate(null);
  }, [selectedInstitution, institutionalRates, generalRates]);

  // Auto-convert when values change
  useEffect(() => {
    if (debouncedAmount && currencyFrom && currencyTo) {
      handleConvert();
    } else {
      setResult(null);
      setBaseRate(null);
    }
  }, [debouncedAmount, currencyFrom, currencyTo, selectedInstitution]);

  const handleSwapCurrencies = () => {
    if (selectedInstitution) {
      const swappedPairExists = institutionalRates.some(
        rate => 
          rate.institution._id === selectedInstitution &&
          rate.currencyFrom === currencyTo &&
          rate.currencyTo === currencyFrom
      );
      
      if (!swappedPairExists) {
        toast.error('This currency pair is not available for the selected institution');
        return;
      }
    }

    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setResult(null);
    setBaseRate(null);
  };

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setResult(null);
      setBaseRate(null);
      return;
    }

    if (!currencyFrom || !currencyTo) {
      setResult(null);
      setBaseRate(null);
      return;
    }

    const conversionData: {
      amount: number;
      currencyFrom: string;
      currencyTo: string;
      institution_exchange_rate_id?: string;
    } = {
      amount: Number(amount),
      currencyFrom,
      currencyTo
    };

    if (selectedInstitution) {
      const rate = institutionalRates.find(
        rate => 
          rate.institution._id === selectedInstitution &&
          rate.currencyFrom === currencyFrom &&
          rate.currencyTo === currencyTo
      );
      
      if (!rate) {
        toast.error('Exchange rate not found for this institution');
        return;
      }
      
      conversionData.institution_exchange_rate_id = rate._id;
    }

    convertMutation.mutate(conversionData);
  };

  const handleReset = () => {
    setAmount('');
    setCurrencyFrom('');
    setCurrencyTo('');
    setSelectedInstitution('');
    setResult(null);
    setBaseRate(null);
  };

  // This function fixes a type problem when assigning the 'result' value to the 'Converted to' input 'value' property.
  function handledResult(number: number | null) {
    console.log('Result is: ', number);
    if (number !== null)
      return number;

    return 0;
  }

  if (isLoadingGeneral || (isAuthenticated && isLoadingInstitutional)) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardBody className="gap-6 p-4 sm:p-6">
        
          <h2 className="text-lg font-semibold text-center">
          Make fast and affordable international business payments          
          </h2>
        
        <p className="text-center">
        Send secure international business payments in <span className="font-semibold">XX</span> currencies, all at competitive rates with no hidden fees.        
        </p>
        <div className="flex flex-col gap-6">
          {isAuthenticated && (
            <Select
              label="Institution (Optional)"
              placeholder="Select an institution"
              selectedKeys={selectedInstitution ? [selectedInstitution] : []}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              classNames={{
                trigger: "h-12",
                value: "text-small"
              }}
            >
              {(institutions as { _id: string; name: string }[]).map((institution) => (
                <SelectItem key={institution._id} value={institution._id}>
                  {institution.name}
                </SelectItem>
              ))}
            </Select>
          )}

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-[45%] space-y-2">
              <div className="flex gap-2">
                {/* Amount Input and Selector*/}
                <InputSelector
                label='Amount'
                readOnly={false} 
                value={parseFloat(amount)}
                min={0}
                onValueChange={(element) => setAmount(element.target.value)}
                availableCurrencies={availableFromCurrencies}
                onCurrencyChange={(e) => {
                    setCurrencyFrom(e.target.value);
                    setCurrencyTo('');
                    setResult(null);
                    setBaseRate(null);
                  }}/>
                {/* <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={0}
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400">$</span>
                    </div>
                  }
                  classNames={{
                    input: "text-medium",
                    inputWrapper: "h-12"
                  }}
                /> */}
                <Select
                  selectedKeys={currencyFrom ? [currencyFrom] : []}
                  // onChange={(e) => {
                  //   setCurrencyFrom(e.target.value);
                  //   setCurrencyTo('');
                  //   setResult(null);
                  //   setBaseRate(null);
                  // }}
                  className="w-32"
                  classNames={{
                    trigger: "h-12",
                    value: "text-small"
                  }}
                >
                  {availableFromCurrencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            
            
            <div className="flex items-center justify-center md:w-[10%]">
              <Button
                isIconOnly
                variant="light"
                onPress={handleSwapCurrencies}
                isDisabled={!currencyFrom || !currencyTo}
              >
                <ArrowLeftRight className="rotate-90 md:rotate-0" />
              </Button>
            </div>

            <div className="w-full md:w-[45%] space-y-2">
              <div className="flex gap-2">
                <InputSelector 
                  label="Converted to" 
                  value={handledResult(result)} 
                  readOnly={true} 
                  availableCurrencies={availableToCurrencies}
                />
                {/* <div className="flex-1 h-12 flex items-center px-4 bg-default-100 dark:bg-default-50 rounded-medium">
                  {result !== null ? (
                    <span /*className="font-semibold text-[black]" */ /*>
                      {result.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-default-400">Result</span>
                  )}
                </div> */}
                {/* <Select
                  selectedKeys={currencyTo ? [currencyTo] : []}
                  onChange={(e) => {
                    setCurrencyTo(e.target.value);
                    setResult(null);
                    setBaseRate(null);
                  }}
                  className="w-32"
                  isDisabled={!currencyFrom}
                  classNames={{
                    trigger: "h-12",
                    value: "text-small"
                  }}
                >
                  {availableToCurrencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </Select> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-2">
            {baseRate !== null && currencyFrom && currencyTo && (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-sm text-color=[black] font-semibold">
                  1.00 {currencyFrom} = {baseRate.toFixed(4)} {currencyTo}
                </span>
                <Tooltip 
                  content={
                    <div className="text-[#3D55DD] px-2 py-1 rounded-md">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">
                          Exchange rate at {getGMTTime()} GMT
                        </span>
                        <span className="text-sm">
                          Live rates vary minute to minute. The quotes you receive here will differ from your final trade amount.
                        </span>
                      </div>
                    </div>
                  }
                  className="max-w-xs"
                >
                  <Info size={16} className="cursor-help" style={{ color: '#3D55DD' }} />
                </Tooltip>
              </div>
            )}
            <div className="flex justify-end items-center gap-3 w-full md:w-auto md:ml-auto">
              {/* <Button
                size="lg"
                className="h-12 font-semibold bg-[#E5133A] text-white hover:bg-[#E5133A]/90"
              >
                Get Started
              </Button> */}
              <Button
                variant="flat"
                size="lg"
                onPress={handleReset}
                startContent={<RotateCcw size={18} />}
                className="h-12 font-semibold"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

