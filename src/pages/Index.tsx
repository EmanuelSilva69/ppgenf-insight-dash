import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { BarChart } from "@/components/dashboard/BarChart";
import { StudentList } from "@/components/dashboard/StudentList";
import { Filters } from "@/components/dashboard/Filters";
import { academicData } from "@/data/academicData";
import { Users, GraduationCap, UserCheck } from "lucide-react";

const Index = () => {
  const [selectedSemester, setSelectedSemester] = useState("Todos");
  const [selectedProfessor, setSelectedProfessor] = useState("Todos");

  // Get unique professors
  const professors = useMemo(() => {
    const uniqueProfessors = Array.from(new Set(academicData.map(record => record.orientador)));
    return ["Todos", ...uniqueProfessors.sort()];
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    return academicData.filter(record => {
      const semesterMatch = selectedSemester === "Todos" || record.ano === selectedSemester.split('.')[0];
      const professorMatch = selectedProfessor === "Todos" || record.orientador === selectedProfessor;
      return semesterMatch && professorMatch;
    });
  }, [selectedSemester, selectedProfessor]);

  // Calculate KPIs
  const activeStudents = filteredData.filter(r => !r.defesa).length;
  const graduatedStudents = filteredData.filter(r => r.defesa).length;
  const currentOrientations = activeStudents; // Orientações atuais = alunos sem defesa

  // Calculate completion rate (graduated vs total)
  const totalCompleted = filteredData.filter(r => r.defesa).length;
  const totalStudents = filteredData.length;
  const completionRate = totalStudents > 0 ? (totalCompleted / totalStudents) * 100 : 0;

  // Data for advisors chart
  const advisorsData = useMemo(() => {
    const advisorCounts: Record<string, number> = {};
    filteredData.forEach(record => {
      advisorCounts[record.orientador] = (advisorCounts[record.orientador] || 0) + 1;
    });
    return Object.entries(advisorCounts)
      .map(([name, value]) => ({ name: name.split(' ').slice(0, 2).join(' '), value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filteredData]);

  // Data for research lines chart
  const researchLinesData = useMemo(() => {
    const lineCounts: Record<string, number> = {};
    filteredData.forEach(record => {
      lineCounts[record.linhaPesquisa] = (lineCounts[record.linhaPesquisa] || 0) + 1;
    });
    return Object.entries(lineCounts)
      .map(([name, value]) => ({ 
        name: name.includes("CUIDADO") ? "O CUIDADO EM\nSAÚDE E ENFERMAGEM" : "ENFERMAGEM EM\nSAÚDE COLETIVA", 
        value 
      }));
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Filters
          selectedSemester={selectedSemester}
          selectedProfessor={selectedProfessor}
          onSemesterChange={setSelectedSemester}
          onProfessorChange={setSelectedProfessor}
          professors={professors}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard title="Orientações atuais" value={currentOrientations} icon={UserCheck} />
          <KPICard title="Alunos ativos" value={activeStudents} icon={Users} />
          <KPICard title="Alunos formados" value={graduatedStudents} icon={GraduationCap} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GaugeChart title="Status de formação" percentage={completionRate} />
          <BarChart title="Linha de pesquisa" data={researchLinesData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart title="Orientandos por professor" data={advisorsData} />
          <StudentList 
            title="Alunos formados/ingressantes" 
            students={filteredData.slice(0, 20)} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
