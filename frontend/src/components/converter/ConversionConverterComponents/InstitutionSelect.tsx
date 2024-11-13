import { Select, SelectItem } from "@nextui-org/react";

interface Institution {
  _id: string;
  name: string;
}

interface InstitutionSelectProps {
  institutions: Institution[];
  selectedInstitution: string;
  onSelect: (institution: string) => void;
}

export function InstitutionSelect({
  institutions,
  selectedInstitution,
  onSelect,
}: InstitutionSelectProps) {
  return (
    <Select
      label="Institution (Optional)"
      placeholder="Select an institution"
      selectedKeys={selectedInstitution ? [selectedInstitution] : []}
      onChange={(e) => onSelect(e.target.value)}
      classNames={{
        trigger: "h-12",
        value: "text-small",
      }}
    >
      {institutions.map((institution) => (
        <SelectItem key={institution._id} value={institution._id}>
          {institution.name}
        </SelectItem>
      ))}
    </Select>
  );
}
