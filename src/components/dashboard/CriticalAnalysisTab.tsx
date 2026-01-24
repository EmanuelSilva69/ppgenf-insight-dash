import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { KPICard } from "./KPICard";
import { 
  selectiveProcessData, 
  getAnalysisByQuadriennium, 
  getProgramTotals 
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
  Clock
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
  Area
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

export function CriticalAnalysisTab() {
  const quadrienniumData = useMemo(() => getAnalysisByQuadriennium(), []);
  const programTotals = useMemo(() => getProgramTotals(), []);

  // Preparar dados para gráfico de evolução
  const evolutionData = useMemo(() => {
    return selectiveProcessData.map(t => ({
      turma: `T${t.turma} (${t.ano})`,
      ano: t.ano,
      inscritos: t.inscritos,
      aprovados: t.aprovados,
      matriculados: t.matriculados,
      concluintes: t.concluintes,
      evasao: t.desistencias + t.desligamentos,
    }));
  }, []);

  // Dados para gráfico de taxas por quadriênio
  const ratesData = useMemo(() => {
    return quadrienniumData.map(q => ({
      name: q.quadrienio.replace(" (Incompleto)", "*"),
      taxaAprovacao: Math.round(q.taxaAprovacao),
      taxaConclusao: Math.round(q.taxaConclusao),
      taxaEvasao: Math.round(q.taxaEvasao),
    }));
  }, [quadrienniumData]);

  // Análise crítica textual
  const criticalAnalysis = useMemo(() => {
    const issues: { type: 'warning' | 'success' | 'info'; title: string; description: string }[] = [];
    
    // Verificar taxa de evasão
    const totalEvasao = programTotals.desistencias + programTotals.desligamentos;
    if (totalEvasao === 0) {
      issues.push({
        type: 'success',
        title: 'Taxa de Evasão Zero',
        description: 'O programa não registrou desistências ou desligamentos até o momento, indicando excelente retenção de discentes.'
      });
    } else if (programTotals.taxaEvasao > 10) {
      issues.push({
        type: 'warning',
        title: 'Taxa de Evasão Elevada',
        description: `A taxa de evasão de ${programTotals.taxaEvasao.toFixed(1)}% merece atenção. Recomenda-se análise das causas.`
      });
    }

    // Verificar competitividade do processo seletivo
    if (programTotals.taxaAprovacao < 25) {
      issues.push({
        type: 'info',
        title: 'Alta Competitividade',
        description: `Com taxa de aprovação de ${programTotals.taxaAprovacao.toFixed(1)}%, o processo seletivo demonstra alta demanda e seletividade.`
      });
    }

    // Verificar taxa de conclusão
    const concluintesValidos = programTotals.concluintes;
    const matriculadosSemAndamento = programTotals.matriculados - programTotals.emAndamento;
    const taxaConclusaoReal = matriculadosSemAndamento > 0 
      ? (concluintesValidos / matriculadosSemAndamento) * 100 
      : 0;
    
    if (taxaConclusaoReal >= 90) {
      issues.push({
        type: 'success',
        title: 'Excelente Taxa de Conclusão',
        description: `${taxaConclusaoReal.toFixed(1)}% dos matriculados (excluindo em andamento) concluíram o curso.`
      });
    }

    return issues;
  }, [programTotals]);

  return (
    <div className="space-y-6">
      {/* Título e Descrição */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Análise Crítica do Programa</h2>
        <p className="text-muted-foreground">
          Dados sobre candidatos inscritos e aprovados no processo seletivo, número de concluintes, 
          desistências e desligamentos por quadriênio.
        </p>
      </div>

      {/* KPIs Gerais do Programa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <KPICard 
          title="Total Inscritos" 
          value={programTotals.inscritos} 
          icon={Users} 
        />
        <KPICard 
          title="Total Aprovados" 
          value={programTotals.aprovados} 
          icon={UserCheck} 
        />
        <KPICard 
          title="Matriculados" 
          value={programTotals.matriculados} 
          icon={GraduationCap} 
        />
        <KPICard 
          title="Concluintes" 
          value={programTotals.concluintes} 
          icon={CheckCircle} 
        />
        <KPICard 
          title="Em Andamento" 
          value={programTotals.emAndamento} 
          icon={Clock} 
        />
        <KPICard 
          title="Desistências" 
          value={programTotals.desistencias} 
          icon={UserMinus} 
        />
        <KPICard 
          title="Desligamentos" 
          value={programTotals.desligamentos} 
          icon={UserX} 
        />
      </div>

      {/* Alertas de Análise Crítica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {criticalAnalysis.map((issue, index) => (
          <Alert key={index} variant={issue.type === 'warning' ? 'destructive' : 'default'} className={
            issue.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' : 
            issue.type === 'info' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : ''
          }>
            {issue.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : 
             issue.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
             <TrendingUp className="h-4 w-4 text-blue-600" />}
            <AlertTitle>{issue.title}</AlertTitle>
            <AlertDescription>{issue.description}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Gráfico de Evolução por Turma */}
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

      {/* Gráfico de Taxas por Quadriênio */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Taxas por Quadriênio (%)
          </CardTitle>
          <CardDescription>
            Taxa de aprovação no seletivo, conclusão e evasão por período de avaliação CAPES
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
              <Bar dataKey="taxaConclusao" fill="hsl(var(--chart-4))" name="Taxa Conclusão" radius={[4, 4, 0, 0]} />
              <Bar dataKey="taxaEvasao" fill="hsl(var(--destructive))" name="Taxa Evasão" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabela Detalhada por Quadriênio */}
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
                  <TableHead className="text-center">Inscritos</TableHead>
                  <TableHead className="text-center">Aprovados</TableHead>
                  <TableHead className="text-center">Matriculados</TableHead>
                  <TableHead className="text-center">Concluintes</TableHead>
                  <TableHead className="text-center">Em Andamento</TableHead>
                  <TableHead className="text-center">Desistências</TableHead>
                  <TableHead className="text-center">Desligamentos</TableHead>
                  <TableHead className="text-center">Taxa Aprovação</TableHead>
                  <TableHead className="text-center">Taxa Conclusão</TableHead>
                  <TableHead className="text-center">Taxa Evasão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quadrienniumData.map((q, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{q.quadrienio}</TableCell>
                    <TableCell className="text-center">{q.totalInscritos}</TableCell>
                    <TableCell className="text-center">{q.totalAprovados}</TableCell>
                    <TableCell className="text-center">{q.totalMatriculados}</TableCell>
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
                      <Badge variant="outline">{q.taxaAprovacao.toFixed(1)}%</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={q.taxaConclusao >= 80 ? "default" : "secondary"} className={q.taxaConclusao >= 80 ? "bg-green-600" : ""}>
                        {q.taxaConclusao.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={q.taxaEvasao > 0 ? "destructive" : "outline"}>
                        {q.taxaEvasao.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Linha de Totais */}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell>TOTAL GERAL</TableCell>
                  <TableCell className="text-center">{programTotals.inscritos}</TableCell>
                  <TableCell className="text-center">{programTotals.aprovados}</TableCell>
                  <TableCell className="text-center">{programTotals.matriculados}</TableCell>
                  <TableCell className="text-center">{programTotals.concluintes}</TableCell>
                  <TableCell className="text-center">{programTotals.emAndamento}</TableCell>
                  <TableCell className="text-center">{programTotals.desistencias}</TableCell>
                  <TableCell className="text-center">{programTotals.desligamentos}</TableCell>
                  <TableCell className="text-center">{programTotals.taxaAprovacao.toFixed(1)}%</TableCell>
                  <TableCell className="text-center">{programTotals.taxaConclusao.toFixed(1)}%</TableCell>
                  <TableCell className="text-center">{programTotals.taxaEvasao.toFixed(1)}%</TableCell>
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
            e desenvolvimento de ações de melhoria contínua.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
