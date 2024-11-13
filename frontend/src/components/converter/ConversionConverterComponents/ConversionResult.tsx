import { Button } from "@nextui-org/react";
import { RotateCcw } from "lucide-react";
import { TooltipInfo } from "./TooltipInfo";
import { getGMTTime } from "../utils";

interface ConversionResultProps {
  baseRate: number | null;
  currencyFrom: string;
  currencyTo: string;
  onReset: () => void;
}

export function ConversionResult({
  baseRate,
  currencyFrom,
  currencyTo,
  onReset,
}: ConversionResultProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-2">
      {baseRate !== null && currencyFrom && currencyTo && (
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm text-color=[black] font-semibold">
            1.00 {currencyFrom} = {baseRate.toFixed(4)} {currencyTo}
          </span>
          <TooltipInfo time={getGMTTime()} />
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
          onPress={onReset}
          startContent={<RotateCcw size={18} />}
          className="h-12 font-semibold bg-primary-600 dark:bg-primary-500 text-white font-medium"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
