import { Select, SelectItem } from "@nextui-org/react";

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  isDisabled?: boolean;
}

export function CurrencySelector({
  value,
  onChange,
  currencies,
  isDisabled,
}: CurrencySelectorProps) {
  return (
    <Select
      selectedKeys={value ? [value] : []}
      onChange={(e) => onChange(e.target.value)}
      className="w-32"
      isDisabled={isDisabled}
      classNames={{
        trigger: "h-12",
        value: "text-small",
      }}
    >
      {currencies.map((currency) => (
        <SelectItem key={currency} value={currency}>
          {currency}
        </SelectItem>
      ))}
    </Select>
  );
}
