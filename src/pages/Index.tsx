import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { BarChart } from "@/components/dashboard/BarChart";
import { StudentList } from "@/components/dashboard/StudentList";
import { Filters } from "@/components/dashboard/Filters";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { QuadrienniumChart } from "@/components/dashboard/QuadrienniumChart";
import { CotasTab } from "@/components/dashboard/CotasTab";
import { CriticalAnalysisTab } from "@/components/dashboard/CriticalAnalysisTab";
import { academicData, filterByBienio, filterByQuadrienio } from "@/data/academicData";
import { selectiveProcessData, getProgramTotals } from "@/data/selectiveProcessData";
import { Users, UserCheck, CheckCircle, Clock, Timer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Gets program totals when no filters, filtered when there are filters
  const getProgramStats = useMemo(() => {
    const hasFilters = selectedYear !== "Todos" || selectedProfessor !== "Todos" || selectedPeriod !== "Todos";
    
    if (!hasFilters) {
      // No filters - use academicData totals only (students with complete academic records)
      return {
        totalMatriculados: academicData.length,
        totalConcluintes: academicData.filter(r => r.defesa !== "").length,
        totalEmAndamento: academicData.filter(r => r.conclusaoNoPrazo === "EM_ANDAMENTO").length,
      };
    } else if (selectedYear !== "Todos") {
      // Filter by year from academicData
      const yearData = academicData.filter(r => r.ano === parseInt(selectedYear));
      return {
        totalMatriculados: yearData.length,
        totalConcluintes: yearData.filter(r => r.defesa !== "").length,
        totalEmAndamento: yearData.filter(r => r.conclusaoNoPrazo === "EM_ANDAMENTO").length,
      };
    }
    
    // For other filters, use filtered academic data
    return {
      totalMatriculados: filteredData.length,
      totalConcluintes: filteredData.filter(r => r.defesa !== "").length,
      totalEmAndamento: filteredData.filter(r => r.conclusaoNoPrazo === "EM_ANDAMENTO").length,
    };
  }, [selectedYear, selectedProfessor, selectedPeriod, selectedPeriodType, filteredData]);

  // Calculate KPIs using program stats
  const totalStudents = getProgramStats.totalMatriculados;
  const ongoingOrientations = getProgramStats.totalEmAndamento;
  const completedOrientations = getProgramStats.totalConcluintes;

  // Média de tempo de conclusão (apenas alunos formados com data de defesa)
  const completedStudents = filteredData.filter(r => r.totalMeses > 0 && r.defesa !== "");
  const averageCompletionTime = completedStudents.length > 0 
    ? (completedStudents.reduce((sum, r) => sum + r.totalMeses, 0) / completedStudents.length).toFixed(1)
    : "0";

  // Taxa de conclusão no prazo (considera concluintes vs total matriculados)
  const onTimeCount = filteredData.filter(r => r.conclusaoNoPrazo === "SIM" && r.defesa !== "").length;
  const completionRate = completedOrientations > 0 ? (completedOrientations / totalStudents) * 100 : 0;

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
        ? "Cuidado em Saúde e Enfermagem" 
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
      
      <main className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          {/* Tabs List - Responsivo */}
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0 mb-4 sm:mb-6">
            <TabsList className="mb-0 w-fit sm:w-auto inline-flex sm:flex justify-start sm:justify-start">
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
              <TabsTrigger value="analise" className="text-xs sm:text-sm">Análise do Quadriênio</TabsTrigger>
              <TabsTrigger value="cotas" className="text-xs sm:text-sm">Cotas, Idade e Sexo</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            {/* Filters & Export - Responsivo */}
            <div className="flex flex-col gap-3 sm:gap-4">
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

            {/* KPI Cards - Responsivo com Grid Adaptativo */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
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
                title="Média tempo conclusão" 
                value={`${averageCompletionTime}`}
                subtitle="meses"
                icon={Clock} 
              />
              <KPICard 
                title="Conclusão no prazo" 
                value={`${completionRate.toFixed(0)}%`}
                subtitle={`${completedOrientations} de ${totalStudents}`}
                icon={Timer} 
              />
            </div>

            {/* Charts Grid - Responsivo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <GaugeChart title="Taxa de conclusão no prazo" percentage={completionRate} />
              <BarChart 
                title="Distribuição por linha de pesquisa" 
                data={researchLinesData} 
                horizontalLabels={true}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <BarChart title="Orientandos por professor (Top 10)" data={advisorsData} />
              <BarChart 
                title="Média de meses para conclusão por ano" 
                data={completionByYearData} 
                showGlobalAverage={true}
              />
            </div>

            {/* Quadrennium Chart */}
            <div>
              <QuadrienniumChart data={filteredData} />
            </div>

            {/* Student List */}
            <div>
              <StudentList 
                title="Lista de alunos" 
                students={filteredData} 
              />
            </div>
          </TabsContent>

          <TabsContent value="analise">
            <CriticalAnalysisTab />
          </TabsContent>

          <TabsContent value="cotas">
            <CotasTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;