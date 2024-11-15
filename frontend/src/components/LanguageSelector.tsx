import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Languages } from "lucide-react";
import { useLanguageStore } from "@/stores/languageStore";

const languages = [
  { key: "en", name: "English" },
  { key: "es", name: "Español" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light" className="text-primary-600 ">
          <Languages size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={[language]}
        onAction={(key) => setLanguage(key as string)}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.key} className="text-black">
            {lang.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
