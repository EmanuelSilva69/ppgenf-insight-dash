import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AcademicRecord } from "@/data/academicData";

interface StudentListProps {
  title: string;
  students: AcademicRecord[];
}

export function StudentList({ title, students }: StudentListProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {students.map((student, index) => (
              <div
                key={student.matricula}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
              >
                <p className="font-medium text-sm text-foreground">{student.nome}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Orientador: {student.orientador}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
