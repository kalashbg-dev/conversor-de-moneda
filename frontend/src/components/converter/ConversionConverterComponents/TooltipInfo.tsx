import { Tooltip } from "@nextui-org/react";
import { Info } from "lucide-react";

interface TooltipInfoProps {
  time: string;
}

export function TooltipInfo({ time }: TooltipInfoProps) {
  return (
    <Tooltip
      content={
        <div className="text-[#3D55DD] px-2 py-1 rounded-md">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Exchange rate at {time} GMT
            </span>
            <span className="text-sm">
              Live rates vary minute to minute. The quotes you receive here will
              differ from your final trade amount.
            </span>
          </div>
        </div>
      }
      className="max-w-xs"
    >
      <Info size={16} className="cursor-help" style={{ color: "#3D55DD" }} />
    </Tooltip>
  );
}
