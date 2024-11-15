import { Tooltip } from "@nextui-org/react";
import { Info } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface TooltipInfoProps {
  time: string;
}

export function TooltipInfo({ time }: TooltipInfoProps) {

  const { t } = useTranslation();

  return (
    <Tooltip
      content={
        <div className="text-[#3D55DD] px-2 py-1 rounded-md">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              {t('converter.tooltip_title')}{time} GMT
            </span>
            <span className="text-sm">
            {t('converter.tooltip_description')}
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
