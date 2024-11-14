// import { Select, SelectItem } from "@nextui-org/react";

interface Institution {
  _id: string;
  name: string;
}

interface InstitutionSelectProps {
  label: string;
  institutions: Institution[];
  selectedInstitution: string;
  onSelect: (institution: string) => void;
}

export function InstitutionSelect({
  label,
  institutions,
  selectedInstitution,
  onSelect,
}: InstitutionSelectProps) {
  return (

    <div className="institute-selector">
      <label className="text-small">{label}</label>
      <select value={selectedInstitution} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select an institution</option>
        {institutions.map((institution) => (
          <option key={institution._id} value={institution._id}>
            {institution.name}
          </option>
        ))}
      </select>
    </div>
    
    // <Select
    //   label="Institution (Optional)"
    //   placeholder="Select an institution"
    //   selectedKeys={selectedInstitution ? [selectedInstitution] : []}
    //   onChange={(e) => onSelect(e.target.value)}
    //   classNames={{
    //     trigger: "h-12",
    //     value: "text-small",
    //   }}
    // >
    //   {institutions.map((institution) => (
    //     <SelectItem key={institution._id} value={institution._id}>
    //       {institution.name}
    //     </SelectItem>
    //   ))}
    // </Select>
  );
}
