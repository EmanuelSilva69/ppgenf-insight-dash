import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FiltersProps {
  selectedSemester: string;
  selectedProfessor: string;
  onSemesterChange: (value: string) => void;
  onProfessorChange: (value: string) => void;
  professors: string[];
}

export function Filters({ 
  selectedSemester, 
  selectedProfessor, 
  onSemesterChange, 
  onProfessorChange,
  professors 
}: FiltersProps) {
  const semesters = ["Todos", "2011.1", "2012.1", "2013.1", "2014.1", "2015.1", "2016.1", "2017.1", "2018.1", "2019.1", "2020.1", "2021.1", "2022.1", "2023.1", "2024.1", "2025.1"];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="p-4 border-primary/20">
        <label className="text-sm font-medium text-primary mb-2 block">Filtro por semestre</label>
        <Select value={selectedSemester} onValueChange={onSemesterChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selecione o semestre" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {semesters.map((semester) => (
              <SelectItem key={semester} value={semester}>
                {semester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>
      
      <Card className="p-4 border-primary/20">
        <label className="text-sm font-medium text-primary mb-2 block">Filtro por professor</label>
        <Select value={selectedProfessor} onValueChange={onProfessorChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Selecione o professor" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
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
