import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { BarChart } from "@/components/dashboard/BarChart";
import { StudentList } from "@/components/dashboard/StudentList";
import { Filters } from "@/components/dashboard/Filters";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { academicData, filterByBienio, filterByQuadrienio } from "@/data/academicData";
import { Users, GraduationCap, UserCheck, Clock, CheckCircle, Timer } from "lucide-react";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState("Todos");
  const [selectedProfessor, setSelectedProfessor] = useState("Todos");
  const [selectedPeriodType, setSelectedPeriodType] = useState("ano");
  const [selectedPeriod, setSelectedPeriod] = useState("Todos");

  // Get unique professors
  const professors = useMemo(() => {
    const uniqueProfessors = Array.from(new Set(academicData.map(record => record.orientador)));
    return ["Todos", ...uniqueProfessors.sort()];
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    let data = academicData;
    
    // Apply period filter
    if (selectedPeriodType === "bienio" && selectedPeriod !== "Todos") {
      data = filterByBienio(data, selectedPeriod);
    } else if (selectedPeriodType === "quadrienio" && selectedPeriod !== "Todos") {
      data = filterByQuadrienio(data, selectedPeriod);
    } else if (selectedPeriodType === "ano" && selectedYear !== "Todos") {
      data = data.filter(r => r.ano === parseInt(selectedYear));
    }
    
    // Apply professor filter
    if (selectedProfessor !== "Todos") {
      data = data.filter(r => r.orientador === selectedProfessor);
    }
    
    return data;
  }, [selectedYear, selectedProfessor, selectedPeriodType, selectedPeriod]);

  // Calculate KPIs
  const activeStudents = filteredData.filter(r => r.conclusaoNoPrazo === "EM_ANDAMENTO").length;
  const graduatedStudents = filteredData.filter(r => r.defesa !== "").length;
  const totalStudents = filteredData.length;

  // Orientações em andamento vs concluídas
  const ongoingOrientations = activeStudents;
  const completedOrientations = graduatedStudents;

  // Média de tempo de conclusão (apenas alunos formados)
  const completedStudents = filteredData.filter(r => r.totalMeses > 0);
  const averageCompletionTime = completedStudents.length > 0 
    ? (completedStudents.reduce((sum, r) => sum + r.totalMeses, 0) / completedStudents.length).toFixed(1)
    : "0";

  // Taxa de conclusão no prazo
  const onTimeCount = filteredData.filter(r => r.conclusaoNoPrazo === "SIM").length;
  const completionRate = graduatedStudents > 0 ? (onTimeCount / graduatedStudents) * 100 : 0;

  // Data for advisors chart
  const advisorsData = useMemo(() => {
    const advisorCounts: Record<string, { total: number; ongoing: number; completed: number }> = {};
    filteredData.forEach(record => {
      if (!advisorCounts[record.orientador]) {
        advisorCounts[record.orientador] = { total: 0, ongoing: 0, completed: 0 };
      }
      advisorCounts[record.orientador].total++;
      if (record.conclusaoNoPrazo === "EM_ANDAMENTO") {
        advisorCounts[record.orientador].ongoing++;
      } else {
        advisorCounts[record.orientador].completed++;
      }
    });
    return Object.entries(advisorCounts)
      .map(([name, counts]) => ({ 
        name: name.split(' ').slice(0, 2).join(' '), 
        value: counts.total,
        ongoing: counts.ongoing,
        completed: counts.completed
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filteredData]);

  // Data for research lines chart
  const researchLinesData = useMemo(() => {
    const lineCounts: Record<string, number> = {};
    filteredData.forEach(record => {
      const lineName = record.linhaPesquisa.includes("CUIDADO") 
        ? "O Cuidado em Saúde e Enfermagem" 
        : "Enfermagem em Saúde Coletiva";
      lineCounts[lineName] = (lineCounts[lineName] || 0) + 1;
    });
    return Object.entries(lineCounts)
      .map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // Data for completion time by year
  const completionByYearData = useMemo(() => {
    const yearData: Record<number, { total: number; count: number }> = {};
    filteredData.filter(r => r.totalMeses > 0).forEach(record => {
      if (!yearData[record.ano]) {
        yearData[record.ano] = { total: 0, count: 0 };
      }
      yearData[record.ano].total += record.totalMeses;
      yearData[record.ano].count++;
    });
    return Object.entries(yearData)
      .map(([year, data]) => ({ 
        name: year, 
        value: Math.round(data.total / data.count * 10) / 10 
      }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name));
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <Filters
            selectedYear={selectedYear}
            selectedProfessor={selectedProfessor}
            selectedPeriodType={selectedPeriodType}
            selectedPeriod={selectedPeriod}
            onYearChange={setSelectedYear}
            onProfessorChange={setSelectedProfessor}
            onPeriodTypeChange={setSelectedPeriodType}
            onPeriodChange={setSelectedPeriod}
            professors={professors}
          />
          <ExportButton data={filteredData} filename={`ppgenf-${selectedPeriodType}-${selectedPeriod !== "Todos" ? selectedPeriod : "todos"}`} />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <KPICard 
            title="Total de alunos" 
            value={totalStudents} 
            icon={Users} 
          />
          <KPICard 
            title="Orientações em andamento" 
            value={ongoingOrientations} 
            icon={UserCheck} 
          />
          <KPICard 
            title="Orientações concluídas" 
            value={completedOrientations} 
            icon={CheckCircle} 
          />
          <KPICard 
            title="Alunos formados" 
            value={graduatedStudents} 
            icon={GraduationCap} 
          />
          <KPICard 
            title="Média tempo conclusão" 
            value={`${averageCompletionTime}`}
            subtitle="meses"
            icon={Clock} 
          />
          <KPICard 
            title="Conclusão no prazo" 
            value={`${completionRate.toFixed(0)}%`}
            subtitle={`${onTimeCount} de ${graduatedStudents}`}
            icon={Timer} 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GaugeChart title="Taxa de conclusão no prazo" percentage={completionRate} />
          <BarChart title="Distribuição por linha de pesquisa" data={researchLinesData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BarChart title="Orientandos por professor (Top 10)" data={advisorsData} />
          <BarChart title="Média de meses para conclusão por ano" data={completionByYearData} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <StudentList 
            title="Lista de alunos" 
            students={filteredData} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
