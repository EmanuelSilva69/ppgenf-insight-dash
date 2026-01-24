import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KPICard } from "./KPICard";
import { 
  selectiveProcessData, 
  getAnalysisByQuadriennium, 
  getProgramTotals,
  getAvailableYears,
  filterDataByYear,
  getMostCompetitiveYear,
  getAttritionAlerts
} from "@/data/selectiveProcessData";
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  UserMinus, 
  UserX, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Award,
  BarChart3,
  Filter
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line,
  ComposedChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  AreaChart
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
  destructive: "hsl(var(--destructive))",
  success: "#22c55e",
  warning: "#f59e0b",
};

const DONUT_COLORS = ["#f59e0b", "#ef4444"];

export function CriticalAnalysisTab() {
  const [selectedYear, setSelectedYear] = useState("Todos");
  
  const availableYears = useMemo(() => getAvailableYears(), []);
  const filteredData = useMemo(() => filterDataByYear(selectedYear), [selectedYear]);
  const quadrienniumData = useMemo(() => getAnalysisByQuadriennium(), []);
  const programTotals = useMemo(() => getProgramTotals(), []);
  const mostCompetitiveYear = useMemo(() => getMostCompetitiveYear(), []);
  const attritionAlerts = useMemo(() => getAttritionAlerts(), []);

  // Calcular totais filtrados
  const filteredTotals = useMemo(() => {
    const totals = filteredData.reduce((acc, t) => ({
      vagas: acc.vagas + t.vagas_ofertadas,
      inscritos: acc.inscritos + t.inscritos,
      aprovados: acc.aprovados + t.aprovados,
      matriculados: acc.matriculados + t.matriculados,
      concluintes: acc.concluintes + t.concluintes,
      desistencias: acc.desistencias + t.desistencias,
      desligamentos: acc.desligamentos + t.desligamentos,
      emAndamento: acc.emAndamento + t.emAndamento,
    }), { vagas: 0, inscritos: 0, aprovados: 0, matriculados: 0, concluintes: 0, desistencias: 0, desligamentos: 0, emAndamento: 0 });

    return {
      ...totals,
      taxaSelecao: totals.vagas > 0 ? totals.inscritos / totals.vagas : 0,
      taxaSucesso: totals.aprovados > 0 ? (totals.concluintes / totals.aprovados) * 100 : 0,
      taxaPerda: totals.aprovados > 0 ? ((totals.desistencias + totals.desligamentos) / totals.aprovados) * 100 : 0,
    };
  }, [filteredData]);

  // Dados para gráfico Oferta vs Demanda
  const ofertaDemandaData = useMemo(() => {
    return filteredData.map(t => ({
      ano: t.ano.toString(),
      vagas: t.vagas_ofertadas,
      inscritos: t.inscritos,
      ratio: (t.inscritos / t.vagas_ofertadas).toFixed(1),
    }));
  }, [filteredData]);

  // Dados para Funnel Chart
  const funnelData = useMemo(() => {
    return [
      { name: "Inscritos", value: filteredTotals.inscritos, fill: COLORS.primary },
      { name: "Aprovados", value: filteredTotals.aprovados, fill: COLORS.secondary },
      { name: "Matriculados", value: filteredTotals.matriculados, fill: COLORS.tertiary },
    ];
  }, [filteredTotals]);

  // Dados para gráfico de área (fluxo por coorte)
  const fluxData = useMemo(() => {
    return filteredData.map(t => ({
      ano: t.ano.toString(),
      matriculados: t.matriculados,
      concluintes: t.concluintes,
      desistencias: t.desistencias,
      desligamentos: t.desligamentos,
      emAndamento: t.emAndamento,
    }));
  }, [filteredData]);

  // Dados para Donut Chart (causas de não conclusão)
  const nonCompletionData = useMemo(() => {
    const desistencias = filteredTotals.desistencias;
    const desligamentos = filteredTotals.desligamentos;
    
    if (desistencias === 0 && desligamentos === 0) {
      return [{ name: "Sem perdas registradas", value: 1, color: COLORS.success }];
    }
    
    return [
      { name: "Desistências", value: desistencias, color: DONUT_COLORS[0] },
      { name: "Desligamentos", value: desligamentos, color: DONUT_COLORS[1] },
    ];
  }, [filteredTotals]);

  // Dados para gráfico Aprovados vs Concluintes
  const aprovadosConcluintesData = useMemo(() => {
    return filteredData.map(t => ({
      ano: t.ano.toString(),
      aprovados: t.aprovados,
      concluintes: t.concluintes,
      gap: t.aprovados - t.concluintes,
      taxaSucesso: t.aprovados > 0 ? ((t.concluintes / t.aprovados) * 100).toFixed(1) : "0",
    }));
  }, [filteredData]);

  // Preparar dados para gráfico de evolução
  const evolutionData = useMemo(() => {
    return filteredData.map(t => ({
      turma: `T${t.turma} (${t.ano})`,
      ano: t.ano,
      inscritos: t.inscritos,
      aprovados: t.aprovados,
      matriculados: t.matriculados,
      concluintes: t.concluintes,
      evasao: t.desistencias + t.desligamentos,
    }));
  }, [filteredData]);

  // Dados para gráfico de taxas por quadriênio
  const ratesData = useMemo(() => {
    return quadrienniumData.map(q => ({
      name: q.quadrienio.replace(" (Incompleto)", "*"),
      taxaAprovacao: Math.round(q.taxaAprovacao),
      taxaConclusao: Math.round(q.taxaConclusao),
      taxaEvasao: Math.round(q.taxaEvasao),
      taxaSucesso: Math.round(q.taxaSucesso),
    }));
  }, [quadrienniumData]);

  // Análise crítica automática
  const criticalAnalysis = useMemo(() => {
    const issues: { type: 'warning' | 'success' | 'info'; title: string; description: string; badge: string }[] = [];
    
    // Verificar taxa de evasão
    const totalEvasao = programTotals.desistencias + programTotals.desligamentos;
    if (totalEvasao === 0) {
      issues.push({
        type: 'success',
        title: 'Taxa de Evasão Zero',
        description: 'O programa não registrou desistências ou desligamentos até o momento, indicando excelente retenção de discentes.',
        badge: 'Excelente'
      });
    } else if (programTotals.taxaEvasao > 20) {
      issues.push({
        type: 'warning',
        title: 'Alerta de Alta Evasão',
        description: `A taxa de evasão de ${programTotals.taxaEvasao.toFixed(1)}% está acima de 20%, indicando necessidade de ações de retenção.`,
        badge: 'Atenção'
      });
    }

    // Alertas por coorte com evasão > 20%
    attritionAlerts.filter(a => a.tipo === 'high').forEach(alert => {
      issues.push({
        type: 'warning',
        title: `Alta Evasão - Turma ${alert.turma} (${alert.ano})`,
        description: `A turma ${alert.turma} do ano ${alert.ano} apresentou taxa de evasão de ${alert.taxa.toFixed(1)}%.`,
        badge: 'Crítico'
      });
    });

    // Taxa de sucesso alta
    if (programTotals.taxaSucesso >= 90) {
      issues.push({
        type: 'success',
        title: 'Alta Taxa de Sucesso',
        description: `${programTotals.taxaSucesso.toFixed(1)}% dos aprovados no seletivo concluíram o curso, demonstrando excelência na formação.`,
        badge: 'Excelente'
      });
    }

    // Competitividade do processo seletivo
    issues.push({
      type: 'info',
      title: 'Ano Mais Competitivo',
      description: `O ano de ${mostCompetitiveYear.ano} teve a maior competitividade com ${mostCompetitiveYear.ratio.toFixed(1)} candidatos por vaga (${mostCompetitiveYear.inscritos} inscritos para ${mostCompetitiveYear.vagas_ofertadas} vagas).`,
      badge: `${mostCompetitiveYear.ratio.toFixed(1)} cand/vaga`
    });

    // Taxa média de seleção
    if (programTotals.taxaSelecao > 4) {
      issues.push({
        type: 'info',
        title: 'Alta Demanda pelo Programa',
        description: `A média histórica de ${programTotals.taxaSelecao.toFixed(1)} candidatos por vaga demonstra forte procura pelo programa.`,
        badge: 'Alta Demanda'
      });
    }

    return issues;
  }, [programTotals, mostCompetitiveYear, attritionAlerts]);

  return (
    <div className="space-y-6">
      {/* Header com título e filtro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Análise do Quadriênio</h2>
          <p className="text-muted-foreground">
            Análise crítica do fluxo de estudantes: inscritos, aprovados, concluintes, desistências e desligamentos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar ano" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(year => (
                <SelectItem key={year} value={year}>
                  {year === "Todos" ? "Todos os Anos" : year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section A: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total de Inscritos" 
          value={filteredTotals.inscritos} 
          icon={Users}
          subtitle={selectedYear !== "Todos" ? `Ano ${selectedYear}` : "Histórico"}
        />
        <KPICard 
          title="Taxa Média de Seleção" 
          value={`${filteredTotals.taxaSelecao.toFixed(1)}`}
          subtitle="candidatos/vaga"
          icon={Target} 
        />
        <KPICard 
          title="Taxa de Sucesso Global" 
          value={`${filteredTotals.taxaSucesso.toFixed(0)}%`}
          subtitle="Concluintes / Aprovados"
          icon={Award} 
        />
        <KPICard 
          title="Taxa de Perda Total" 
          value={`${filteredTotals.taxaPerda.toFixed(0)}%`}
          subtitle="(Desist. + Deslig.) / Aprovados"
          icon={TrendingDown} 
        />
      </div>

      {/* Section B: Recruitment & Selection Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Oferta vs Demanda */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Oferta vs. Demanda
            </CardTitle>
            <CardDescription>
              Comparativo entre vagas ofertadas e candidatos inscritos por ano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={ofertaDemandaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="ano" 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: number, name: string) => [value, name === 'vagas' ? 'Vagas Ofertadas' : 'Inscritos']}
                />
                <Legend />
                <Bar dataKey="vagas" fill="hsl(var(--chart-2))" name="Vagas Ofertadas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inscritos" fill="hsl(var(--chart-1))" name="Inscritos" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Funnel Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Funil de Seleção
            </CardTitle>
            <CardDescription>
              Fluxo de candidatos: Inscritos → Aprovados → Matriculados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" dataKey="name" fontSize={12} fontWeight="bold" />
                  <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="value" fontSize={14} fontWeight="bold" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section C: Retention & Flux Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Stacked Area - Fluxo por Coorte */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Evolução do Fluxo por Turma
            </CardTitle>
            <CardDescription>
              Resultado de cada coorte: concluintes, em andamento e evasão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={fluxData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="ano" 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="concluintes" stackId="1" stroke="#22c55e" fill="#22c55e" name="Concluintes" />
                <Area type="monotone" dataKey="emAndamento" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" name="Em Andamento" />
                <Area type="monotone" dataKey="desistencias" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Desistências" />
                <Area type="monotone" dataKey="desligamentos" stackId="1" stroke="#ef4444" fill="#ef4444" name="Desligamentos" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 4: Donut Chart - Causas de Não Conclusão */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Causas de Não Conclusão
            </CardTitle>
            <CardDescription>
              Distribuição entre desistências (voluntárias) e desligamentos (administrativos)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nonCompletionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {nonCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {filteredTotals.desistencias === 0 && filteredTotals.desligamentos === 0 && (
              <p className="text-center text-sm text-green-600 font-medium mt-2">
                ✓ Nenhuma perda registrada no período selecionado
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart 5: Aprovados vs Concluintes */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Aprovados vs. Concluintes por Ano
          </CardTitle>
          <CardDescription>
            Comparativo para visualizar o gap entre entrada e conclusão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={aprovadosConcluintesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="ano" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis yAxisId="left" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'taxaSucesso') return [`${value}%`, 'Taxa de Sucesso'];
                  return [value, name === 'aprovados' ? 'Aprovados' : name === 'concluintes' ? 'Concluintes' : 'Gap'];
                }}
              />
              <Legend />
              <Bar dataKey="aprovados" fill="hsl(var(--chart-1))" name="Aprovados" radius={[4, 4, 0, 0]} yAxisId="left" />
              <Bar dataKey="concluintes" fill="#22c55e" name="Concluintes" radius={[4, 4, 0, 0]} yAxisId="left" />
              <Line type="monotone" dataKey="taxaSucesso" stroke="hsl(var(--chart-4))" strokeWidth={3} name="Taxa Sucesso (%)" dot={{ r: 4 }} yAxisId="right" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Evolução por Turma (original) */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Evolução por Turma: Inscritos vs Aprovados vs Concluintes
          </CardTitle>
          <CardDescription>
            Comparativo da evolução do processo seletivo e conclusões ao longo das turmas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="turma" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar dataKey="inscritos" fill="hsl(var(--chart-1))" name="Inscritos" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aprovados" fill="hsl(var(--chart-2))" name="Aprovados" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="concluintes" stroke="hsl(var(--chart-4))" strokeWidth={3} name="Concluintes" dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Análise Crítica Automática */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Análise Crítica Automática
          </CardTitle>
          <CardDescription>
            Insights gerados automaticamente com base nos dados do programa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {criticalAnalysis.map((issue, index) => (
              <Alert 
                key={index} 
                variant={issue.type === 'warning' ? 'destructive' : 'default'} 
                className={
                  issue.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' : 
                  issue.type === 'info' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : ''
                }
              >
                <div className="flex items-start gap-3">
                  {issue.type === 'warning' ? <AlertTriangle className="h-4 w-4 mt-0.5" /> : 
                   issue.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> :
                   <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <AlertTitle className="mb-0">{issue.title}</AlertTitle>
                      <Badge 
                        variant={issue.type === 'warning' ? 'destructive' : issue.type === 'success' ? 'default' : 'secondary'}
                        className={issue.type === 'success' ? 'bg-green-600' : ''}
                      >
                        {issue.badge}
                      </Badge>
                    </div>
                    <AlertDescription>{issue.description}</AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Taxas por Quadriênio (original) */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Taxas por Quadriênio (%)
          </CardTitle>
          <CardDescription>
            Taxa de aprovação no seletivo, sucesso e evasão por período de avaliação CAPES
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={ratesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Bar dataKey="taxaAprovacao" fill="hsl(var(--chart-2))" name="Taxa Aprovação" radius={[4, 4, 0, 0]} />
              <Bar dataKey="taxaSucesso" fill="#22c55e" name="Taxa Sucesso" radius={[4, 4, 0, 0]} />
              <Bar dataKey="taxaEvasao" fill="hsl(var(--destructive))" name="Taxa Evasão" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabela Detalhada por Quadriênio (original) */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Detalhamento por Quadriênio
          </CardTitle>
          <CardDescription>
            Números absolutos e taxas do processo seletivo e conclusão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quadriênio</TableHead>
                  <TableHead className="text-center">Vagas</TableHead>
                  <TableHead className="text-center">Inscritos</TableHead>
                  <TableHead className="text-center">Cand/Vaga</TableHead>
                  <TableHead className="text-center">Aprovados</TableHead>
                  <TableHead className="text-center">Concluintes</TableHead>
                  <TableHead className="text-center">Em Andamento</TableHead>
                  <TableHead className="text-center">Desistências</TableHead>
                  <TableHead className="text-center">Desligamentos</TableHead>
                  <TableHead className="text-center">Taxa Sucesso</TableHead>
                  <TableHead className="text-center">Taxa Perda</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quadrienniumData.map((q, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{q.quadrienio}</TableCell>
                    <TableCell className="text-center">{q.totalVagas}</TableCell>
                    <TableCell className="text-center">{q.totalInscritos}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{q.taxaSelecao.toFixed(1)}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{q.totalAprovados}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="default" className="bg-green-600">
                        {q.totalConcluintes}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {q.totalEmAndamento > 0 ? (
                        <Badge variant="secondary">{q.totalEmAndamento}</Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {q.totalDesistencias > 0 ? (
                        <Badge variant="destructive">{q.totalDesistencias}</Badge>
                      ) : (
                        <span className="text-green-600">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {q.totalDesligamentos > 0 ? (
                        <Badge variant="destructive">{q.totalDesligamentos}</Badge>
                      ) : (
                        <span className="text-green-600">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={q.taxaSucesso >= 80 ? "default" : "secondary"} className={q.taxaSucesso >= 80 ? "bg-green-600" : ""}>
                        {q.taxaSucesso.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={q.taxaPerda > 0 ? "destructive" : "outline"}>
                        {q.taxaPerda.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Linha de Totais */}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell>TOTAL GERAL</TableCell>
                  <TableCell className="text-center">{programTotals.vagas}</TableCell>
                  <TableCell className="text-center">{programTotals.inscritos}</TableCell>
                  <TableCell className="text-center">{programTotals.taxaSelecao.toFixed(1)}</TableCell>
                  <TableCell className="text-center">{programTotals.aprovados}</TableCell>
                  <TableCell className="text-center">{programTotals.concluintes}</TableCell>
                  <TableCell className="text-center">{programTotals.emAndamento}</TableCell>
                  <TableCell className="text-center">{programTotals.desistencias}</TableCell>
                  <TableCell className="text-center">{programTotals.desligamentos}</TableCell>
                  <TableCell className="text-center">{programTotals.taxaSucesso.toFixed(1)}%</TableCell>
                  <TableCell className="text-center">{programTotals.taxaPerda.toFixed(1)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Nota explicativa */}
      <Card className="border-muted bg-muted/30">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> Os dados de inscritos e aprovados são estimativas baseadas nos registros históricos do programa. 
            Para maior precisão, recomenda-se a atualização com os dados oficiais de cada processo seletivo.
            A análise atende ao requisito de autoavaliação do programa para subsidiar o planejamento estratégico 
            e desenvolvimento de ações de melhoria contínua, conforme destacado na avaliação CAPES.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
