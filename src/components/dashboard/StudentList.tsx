import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AcademicRecord } from "@/data/academicData";

interface StudentListProps {
  title: string;
  students: AcademicRecord[];
}

export function StudentList({ title, students }: StudentListProps) {
  const getStatusBadge = (status: string) => {
    if (status === "EM_ANDAMENTO") {
      return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700">Em andamento</Badge>;
    }
    if (status === "SIM") {
      return <Badge variant="secondary" className="bg-green-500/20 text-green-700">No prazo</Badge>;
    }
    return <Badge variant="secondary" className="bg-red-500/20 text-red-700">Fora do prazo</Badge>;
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title} ({students.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.matricula}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{student.nome}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium">Orientador:</span> {student.orientador}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Linha:</span> {student.linhaPesquisa}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Entrada:</span> {student.mesAnoEntrada} | 
                      <span className="font-medium"> Turma:</span> {student.turma} | 
                      {student.totalMeses > 0 && <><span className="font-medium"> Meses:</span> {student.totalMeses}</>}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(student.conclusaoNoPrazo)}
                    {student.defesa && (
                      <p className="text-xs text-muted-foreground mt-1">Defesa: {student.defesa}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
