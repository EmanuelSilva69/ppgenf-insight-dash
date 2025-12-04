import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { getYears, getBienios, getQuadrienios } from "@/data/academicData";

interface FiltersProps {
  selectedYear: string;
  selectedProfessor: string;
  selectedPeriodType: string;
  selectedPeriod: string;
  onYearChange: (value: string) => void;
  onProfessorChange: (value: string) => void;
  onPeriodTypeChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  professors: string[];
}

export function Filters({ 
  selectedYear, 
  selectedProfessor, 
  selectedPeriodType,
  selectedPeriod,
  onYearChange, 
  onProfessorChange,
  onPeriodTypeChange,
  onPeriodChange,
  professors 
}: FiltersProps) {
  const years = ["Todos", ...getYears().map(String)];
  const bienios = ["Todos", ...getBienios()];
  const quadrienios = ["Todos", ...getQuadrienios()];
  
  const periodOptions = selectedPeriodType === "bienio" ? bienios : 
                        selectedPeriodType === "quadrienio" ? quadrienios : [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 border-primary/20">
        <label className="text-sm font-medium text-primary mb-2 block">Filtro por ano</label>
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      <Card className="p-4 border-primary/20">
        <label className="text-sm font-medium text-primary mb-2 block">Tipo de período</label>
        <Select value={selectedPeriodType} onValueChange={(value) => {
          onPeriodTypeChange(value);
          onPeriodChange("Todos");
        }}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="ano">Por Ano</SelectItem>
            <SelectItem value="bienio">Por Biênio</SelectItem>
            <SelectItem value="quadrienio">Por Quadriênio (CAPES)</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {selectedPeriodType !== "ano" && (
        <Card className="p-4 border-primary/20">
          <label className="text-sm font-medium text-primary mb-2 block">
            {selectedPeriodType === "bienio" ? "Biênio" : "Quadriênio"}
          </label>
          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder={`Selecione o ${selectedPeriodType}`} />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {periodOptions.map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
      )}
      
      <Card className="p-4 border-primary/20">
        <label className="text-sm font-medium text-primary mb-2 block">Filtro por orientador</label>
        <Select value={selectedProfessor} onValueChange={onProfessorChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selecione o orientador" />
          </SelectTrigger>
          <SelectContent className="bg-popover max-h-[300px]">
            {professors.map((professor) => (
              <SelectItem key={professor} value={professor}>
                {professor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>
    </div>
  );
}
