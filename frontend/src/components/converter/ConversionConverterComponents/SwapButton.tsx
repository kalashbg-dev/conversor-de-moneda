import { Button } from "@nextui-org/react";
import { ArrowLeftRight } from "lucide-react";

interface SwapButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SwapButton({ onClick, disabled }: SwapButtonProps) {
  return (
    <Button isIconOnly variant="light" onPress={onClick} isDisabled={disabled}>
      <ArrowLeftRight className="rotate-90 md:rotate-0" />
    </Button>
  );
}
