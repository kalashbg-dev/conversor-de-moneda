// import { Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
interface Institution {
  _id: string;
  name: string;
  country?: string;
  img?: string;
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

  const {t} = useTranslation();

  function getInstituteImg() {
    let img;
    img = institutions.find((institution) => {
      if (institution._id === selectedInstitution) {
        return true;
      }
      return false;
    });

    if (!img) {
      return "";
    }
    
    return img.img;
  }

  const image = getInstituteImg();
  return (

    <div className="institute-selector">
      <div className="selector-image">
      <label className="text-small">{label}</label>
      
      <select value={selectedInstitution} onChange={(e) => onSelect(e.target.value)}>
        <option value="">{t('converter.institute_selector.default_option')}</option>
        {institutions.map((institution) => (
          <option key={institution._id} value={institution._id}>
            {institution.name}
          </option>
        ))}
      </select>
      
      
      </div>      
      <img className="rounded-full max-w-16 max-h-16 object-contain" src={image} alt="" />
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
