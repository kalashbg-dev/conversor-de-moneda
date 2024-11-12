import type { ExchangeRate, InstitutionExchangeRate } from './types';

export const getGMTTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
    timeZone: 'GMT'
  });
};

export const getAvailableFromCurrencies = (
  selectedInstitution: string | undefined,
  institutionalRates: InstitutionExchangeRate[],
  generalRates: ExchangeRate[]
): string[] => {
  if (!selectedInstitution) {
    return Array.from(new Set(
      generalRates.flatMap(rate => [rate.currencyFrom])
    )).sort();
  }

  return Array.from(new Set(
    institutionalRates
      .filter(rate => rate.institution._id === selectedInstitution)
      .map(rate => rate.currencyFrom)
  )).sort();
};

export const getAvailableToCurrencies = (
  selectedInstitution: string | undefined,
  currencyFrom: string,
  institutionalRates: InstitutionExchangeRate[],
  generalRates: ExchangeRate[]
): string[] => {
  if (!currencyFrom) return [];

  if (!selectedInstitution) {
    return Array.from(new Set(
      generalRates
        .filter(rate => rate.currencyFrom === currencyFrom)
        .map(rate => rate.currencyTo)
    )).sort();
  }

  return Array.from(new Set(
    institutionalRates
      .filter(rate => 
        rate.institution._id === selectedInstitution && 
        rate.currencyFrom === currencyFrom
      )
      .map(rate => rate.currencyTo)
  )).sort();
};