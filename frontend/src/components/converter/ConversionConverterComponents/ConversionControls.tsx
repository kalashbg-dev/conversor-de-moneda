import { toast } from "sonner";
import './ConversionControl.css'
import { AmountInput } from "./AmountInput";
import { CurrencySelector } from "./CurrencySelector";
import { SwapButton } from "./SwapButton";
import type { ExchangeRate, InstitutionExchangeRate } from "../types";
import { getAvailableFromCurrencies, getAvailableToCurrencies } from "../utils";
import { useTranslation } from "react-i18next";

interface ConversionControlsProps {
  amount: string;
  currencyFrom: string;
  currencyTo: string;
  result: number | null;
  generalRates: ExchangeRate[];
  institutionalRates: InstitutionExchangeRate[];
  selectedInstitution: string;
  onAmountChange: (value: string) => void;
  onCurrencyFromChange: (value: string) => void;
  onCurrencyToChange: (value: string) => void;
}

export function ConversionControls({
  amount,
  currencyFrom,
  currencyTo,
  result,
  generalRates,
  institutionalRates,
  selectedInstitution,
  onAmountChange,
  onCurrencyFromChange,
  onCurrencyToChange,
}: ConversionControlsProps) {
  const { t } = useTranslation();

  const availableFromCurrencies = getAvailableFromCurrencies(
    selectedInstitution,
    institutionalRates,
    generalRates
  );

  const availableToCurrencies = getAvailableToCurrencies(
    selectedInstitution,
    currencyFrom,
    institutionalRates,
    generalRates
  );

  const handleSwapCurrencies = () => {
    if (selectedInstitution) {
      const swappedPairExists = institutionalRates.some(
        (rate) =>
          rate.institution._id === selectedInstitution &&
          rate.currencyFrom === currencyTo &&
          rate.currencyTo === currencyFrom
      );

      if (!swappedPairExists) {
        toast.error(
          "This currency pair is not available for the selected institution"
        );
        return;
      }
    }

    onCurrencyFromChange(currencyTo);
    onCurrencyToChange(currencyFrom);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="w-full md:w-[45%] space-y-2">
        <div className="currency-input">
          <div className="flex gap-2">
            <AmountInput type="number" label={t('converter.from_label')} value={amount} onChange={onAmountChange} />
            <div className="divider"></div>
            <CurrencySelector
              value={currencyFrom}
              onChange={(value) => {
                onCurrencyFromChange(value);
                onCurrencyToChange("");
              }}
              currencies={availableFromCurrencies}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center md:w-[10%]">
        <SwapButton
          onClick={handleSwapCurrencies}
          disabled={!currencyFrom || !currencyTo}
        />
      </div>

      <div className="w-full md:w-[45%] space-y-2">
      <div className="currency-input">
          <div className="flex gap-2">
            {/* <div className="flex-1 h-12 flex items-center px-4 bg-default-100 dark:bg-default-50 rounded-medium"> */}
            {/* <div className="currency-input">
              {result !== null ? (
                <span>{result.toFixed(2)}</span>
              ) : (
                <span className="text-default-400">Result</span>
              )}
            </div> */}
            <AmountInput type="text" label={t('converter.to_label')} value={result?.toFixed(2)} onChange={onAmountChange} readOnly={true} />
            <div className="divider"></div>
            <CurrencySelector
              value={currencyTo}
              onChange={onCurrencyToChange}
              currencies={availableToCurrencies}
              isDisabled={!currencyFrom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
