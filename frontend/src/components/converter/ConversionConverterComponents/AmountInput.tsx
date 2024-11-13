import { Input } from "@nextui-org/react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function AmountInput({ value, onChange }: AmountInputProps) {
  return (
    <Input
      type="number"
      placeholder="Amount"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={0}
      size="lg"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400">$</span>
        </div>
      }
      classNames={{
        input: "text-medium",
        inputWrapper: "h-12",
      }}
    />
  );
}
