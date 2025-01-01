import { useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { useConversionStore } from './stores/conversionStore';
import { useConversion } from './hooks/useConversion';
import { api } from '@/lib/axios';
import { ConversionControls } from './ConversionControls';
import { ConversionResult } from './ConversionResult';
import { InstitutionSelect } from './InstitutionSelect';
import type { ExchangeRate, Institution, InstitutionExchangeRate } from './types';
import './ConversionControl.css';
import { useAuthStore } from "../../stores/authStore";

export function CurrencyConverter() {
  const {
    amount,
    currencyFrom,
    currencyTo,
    selectedInstitution,
    setResult,
    setBaseRate,
    setCurrencyFrom,
    setCurrencyTo,
  } = useConversionStore();

  const { isAuthenticated } = useAuthStore();

  const { data: generalRates = [], isLoading: isLoadingGeneral } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const response = await api.get<ExchangeRate[]>('/exchange-rates');
      return response.data;
    },
  });

  const { data: institutions = [], isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      const response = await api.get<Institution[]>('/institutions');
      return response.data;
    },
  });

  const { data: institutionalRates = [], isLoading: isLoadingInstitutional } = useQuery({
    queryKey: ['institution-exchange-rates'],
    queryFn: async () => {
      const response = await api.get<InstitutionExchangeRate[]>('/institutions-exchange-rates');
      return response.data;
    },
  });

  const convertMutation = useConversion((data) => {
    setResult(data.result);
    if (data.amount > 0) {
      setBaseRate(data.result / data.amount);
    }
  });

  const currentRates = useMemo(() => 
    selectedInstitution 
      ? institutionalRates.filter(rate => rate.institution._id === selectedInstitution)
      : generalRates,
    [selectedInstitution, institutionalRates, generalRates]
  );

  const currentRate = useMemo(() => 
    currentRates.find(
      rate => rate.currencyFrom === currencyFrom && rate.currencyTo === currencyTo
    ),
    [currentRates, currencyFrom, currencyTo]
  );

  const initializeCurrencies = useCallback(() => {
    if (currentRates.length > 0) {
      const firstRate = currentRates[0];
      if (!currencyFrom) {
        setCurrencyFrom(firstRate.currencyFrom);
      }

      const availableTo = currentRates
        .filter(rate => rate.currencyFrom === (currencyFrom || firstRate.currencyFrom))
        .map(rate => rate.currencyTo);

      if (availableTo.length > 0 && !currencyTo) {
        setCurrencyTo(availableTo[0]);
      }
    }
  }, [currentRates, currencyFrom, currencyTo, setCurrencyFrom, setCurrencyTo]);

  const performConversion = useCallback(() => {
    if (!amount || !currencyFrom || !currencyTo || !currentRate) {
      setResult(null);
      setBaseRate(null);
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
      setBaseRate(null);
      return;
    }

    const conversionData = {
      amount: numAmount,
      currencyFrom,
      currencyTo,
      ...(selectedInstitution && currentRate && {
        institution_exchange_rate_id: currentRate._id,
      }),
    };

    convertMutation.mutate(conversionData);
  }, [amount, currencyFrom, currencyTo, currentRate, selectedInstitution, setResult, setBaseRate, convertMutation]);

  useEffect(() => {
    initializeCurrencies();
  }, [initializeCurrencies]);

  useEffect(() => {
    const timer = setTimeout(performConversion, 500);
    return () => clearTimeout(timer);
  }, [performConversion]);

  if (isLoadingGeneral || isLoadingInstitutions || isLoadingInstitutional) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <Card className="w-full max-w-3xl card-min-w mx-auto p-8">
        <CardBody className="gap-6 p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            {institutions.length > 0 && isAuthenticated && (
              <InstitutionSelect
                institutions={institutions}
                selectedInstitution={selectedInstitution}
              />
            )}

            <ConversionControls
              generalRates={generalRates}
              institutionalRates={institutionalRates}
            />

            <ConversionResult />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

