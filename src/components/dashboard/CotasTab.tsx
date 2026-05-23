import { useMemo, useState } from "react";
import { useElementWidth, useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quotaData, getQuotaSummary, getQuotaByYear, getQuotaTotals, inscritosPorCota, getInscritos } from "@/data/quotaData";
import { 
  getGenderDistribution, 
  getAgeDistribution, 
  getDemographicSummary, 
  getYearlyGenderData,
  getAvailableYears,
  approvedCandidates,
  studentBirthDates
} from "@/data/demographicData";
import { academicData } from "@/data/academicData";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine 
} from "recharts";
import { Users, UserCheck, FileText, TrendingUp, User, Calendar, Percent } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Calcula média de idade na defesa por ano usando datas de nascimento atualizadas (DOCX)
function getAverageAgeAtDefenseByYear() {
  const yearData: Record<number, number[]> = {};
  
  academicData
    .filter(r => r.defesa !== "")
    .forEach(record => {
      const birthDate = studentBirthDates[record.matricula];
      if (birthDate) {
        const [diaDefesa, mesDefesa, anoDefesa] = record.defesa.split("/").map(Number);
        const [diaNasc, mesNasc, anoNasc] = birthDate.split("/").map(Number);
        let age = anoDefesa - anoNasc;
        if (mesDefesa < mesNasc || (mesDefesa === mesNasc && diaDefesa < diaNasc)) {
          age--;
        }
        if (!yearData[anoDefesa]) yearData[anoDefesa] = [];
        yearData[anoDefesa].push(age);
      }
    });

  return Object.entries(yearData)
    .map(([year, ages]) => ({
      ano: parseInt(year),
      mediaIdade: parseFloat((ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)),
      quantidade: ages.length,
    }))
    .sort((a, b) => a.ano - b.ano);
}

export function CotasTab() {
  const [selectedYear, setSelectedYear] = useState<string>("Todos");
  const [quotaChartRef, quotaChartWidth] = useElementWidth<HTMLDivElement>();
  const [genderChartRef, genderChartWidth] = useElementWidth<HTMLDivElement>();
  const [inscrChartRef, inscrChartWidth] = useElementWidth<HTMLDivElement>();
  const quotaMedium = quotaChartWidth > 0 && quotaChartWidth < 900;
  const genderMedium = genderChartWidth > 0 && genderChartWidth < 900;
  const inscrMobile = inscrChartWidth > 0 && inscrChartWidth < 450;
  
  const quotaSummary = useMemo(() => getQuotaSummary(), []);
  const quotaByYear = useMemo(() => getQuotaByYear(), []);
  const totals = useMemo(() => getQuotaTotals(), []);
  const availableYears = useMemo(() => getAvailableYears(), []);
  const inscritos = useMemo(() => getInscritos(), []);
  const ageAtDefenseData = useMemo(() => getAverageAgeAtDefenseByYear(), []);
  
  // Calcular média de idade na defesa do período (média ponderada)
  const averageAgeAtDefense = useMemo(() => {
    if (ageAtDefenseData.length === 0) return 0;
    const totalWeighted = ageAtDefenseData.reduce((sum, d) => sum + d.mediaIdade * d.quantidade, 0);
    const totalQuantidade = ageAtDefenseData.reduce((sum, d) => sum + d.quantidade, 0);
    return totalWeighted / totalQuantidade;
  }, [ageAtDefenseData]);

  const totalCotas = totals.pcd + totals.pngc + totals.piq + totals.brTrans + totals.sta;
  const percentCotas = totals.vagas > 0 ? ((totalCotas / totals.vagas) * 100).toFixed(1) : "0";

  // Dados demográficos baseados no filtro de ano
  const yearFilter = selectedYear === "Todos" ? undefined : parseInt(selectedYear);
  const genderData = useMemo(() => getGenderDistribution(yearFilter), [yearFilter]);
  const ageData = useMemo(() => getAgeDistribution(yearFilter), [yearFilter]);
  const summary = useMemo(() => getDemographicSummary(yearFilter), [yearFilter]);
  const yearlyGenderData = useMemo(() => getYearlyGenderData(), []);
  
  // Calcular média total do período
  const averageTotal = useMemo(() => {
    const totals = yearlyGenderData.map(d => d.Feminino + d.Masculino);
    return totals.reduce((a, b) => a + b, 0) / totals.length;
  }, [yearlyGenderData]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs defaultValue="cotas" className="w-full">
        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0 mb-4">
          <TabsList className="mb-0 w-fit sm:w-auto inline-flex justify-start">
            <TabsTrigger value="cotas" className="text-xs sm:text-sm">Cotas</TabsTrigger>
            <TabsTrigger value="demografico" className="text-xs sm:text-sm">Idade e Sexo</TabsTrigger>
          </TabsList>
        </div>

        {/* === ABA COTAS === */}
        <TabsContent value="cotas" className="space-y-4 sm:space-y-6">
          {/* KPI Cards - Responsivo */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                  <div className="p-2 xs:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <FileText className="h-5 xs:h-6 w-5 xs:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xs:text-sm text-muted-foreground truncate">Total de Vagas</p>
                    <p className="text-xl xs:text-2xl font-bold">{totals.vagas}</p>
                    <p className="text-xs text-muted-foreground">2020-2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                  <div className="p-2 xs:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <Users className="h-5 xs:h-6 w-5 xs:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xs:text-sm text-muted-foreground truncate">Ampla Concorrência</p>
                    <p className="text-xl xs:text-2xl font-bold">{totals.acc}</p>
                    <p className="text-xs text-muted-foreground">{((totals.acc / totals.vagas) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                  <div className="p-2 xs:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <UserCheck className="h-5 xs:h-6 w-5 xs:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xs:text-sm text-muted-foreground truncate">Vagas Cotas</p>
                    <p className="text-xl xs:text-2xl font-bold">{totalCotas}</p>
                    <p className="text-xs text-muted-foreground">{percentCotas}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                  <div className="p-2 xs:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <TrendingUp className="h-5 xs:h-6 w-5 xs:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xs:text-sm text-muted-foreground truncate">Inscritos (Total)</p>
                    <p className="text-xl xs:text-2xl font-bold">{totals.isentos + totals.pagantes}</p>
                    <p className="text-xs text-muted-foreground">{totals.isentos} isentos, {totals.pagantes} pagantes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pie Chart - Distribuição por Cota */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm sm:text-lg font-semibold text-primary">Distribuição de Vagas por Tipo de Cota</CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div ref={quotaChartRef} className="w-full overflow-x-auto">
                  <div className="p-2 sm:p-4">
                    <ResponsiveContainer width="100%" height={quotaMedium && inscrMobile ? 420 : 330}>
                      <PieChart margin={{ top: quotaMedium && inscrMobile ? 20 : 10, right: 10, bottom: quotaMedium && inscrMobile ? 130 : 20, left: 10 }}>
                        <Pie
                          data={quotaSummary}
                          cx="50%"
                          cy={quotaMedium && inscrMobile ? "45%" : "50%"}
                          innerRadius={quotaMedium ? 50 : inscrMobile ? 45 : 50}
                          outerRadius={quotaMedium ? 78 : inscrMobile ? 70 : 90}
                          paddingAngle={3}
                          dataKey="total"
                          nameKey="tipo"
                          label={({ total, percent }) => `${total} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={quotaMedium && inscrMobile ? false : { stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                        >
                          {quotaSummary.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cor} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: quotaMedium && inscrMobile ? "10px" : "12px"
                          }}
                          formatter={(value: number, name: string) => [`${value} vagas`, name]}
                        />
                        <Legend 
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ 
                            fontSize: quotaMedium && inscrMobile ? '9px' : '11px', 
                            paddingTop: quotaMedium && inscrMobile ? '24px' : '10px', 
                            width: '100%', 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                          iconSize={quotaMedium && inscrMobile ? 8 : 10}
                          formatter={(value: string) => (
                            <span style={{ color: "hsl(var(--foreground))", fontWeight: "bold", fontSize: quotaMedium && inscrMobile ? 9 : 11, whiteSpace: "normal" }}>{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart - Evolução por Ano */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">Evolução de Vagas por Ano</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={quotaByYear} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="ano" 
                      tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      iconSize={10}
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                    <Bar dataKey="amplaConcorrencia" name="Ampla Concorrência" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cotas" name="Cotas" fill="hsl(200, 70%, 50%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Inscritos por Cota */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-sm sm:text-lg font-semibold text-primary">Vagas Ofertadas vs Inscritos por Tipo de Cota (2020-2025)</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div ref={inscrChartRef} className="w-full overflow-x-auto -mx-2 sm:mx-0">
                <ResponsiveContainer width={inscrMobile ? 500 : "100%"} height={inscrMobile ? 280 : 250}>
                  <BarChart 
                    data={inscritos.filter(i => i.inscritos > 0 || i.vagas > 0)} 
                    layout="vertical"
                    margin={{ top: 5, right: inscrMobile ? 15 : 30, left: inscrMobile ? 80 : 150, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold", fontSize: inscrMobile ? 9 : 11 }} />
                    <YAxis 
                      dataKey="tipo" 
                      type="category" 
                      tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold", fontSize: inscrMobile ? 9 : 12 }}
                      width={inscrMobile ? 75 : 140}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: inscrMobile ? "10px" : "12px"
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === "vagas") return [`${value} vaga(s)`, "Vagas"];
                        return [`${value} inscritos`, "Inscritos"];
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: inscrMobile ? '9px' : '11px', paddingTop: '10px' }}
                      iconSize={inscrMobile ? 8 : 10}
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                    <Bar dataKey="vagas" name="Vagas Ofertadas" fill="hsl(120, 70%, 50%)" radius={[0, 4, 4, 0]} opacity={0.7} />
                    <Bar dataKey="inscritos" name="Inscritos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                      {inscritos.filter(i => i.inscritos > 0 || i.vagas > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Table */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Detalhamento por Turma e Edital</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:hidden">
                {quotaData.map((row) => (
                  <Card key={`${row.turma}-${row.ano}`} className="border-primary/20 bg-secondary/30">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Turma {row.turma} / {row.ano}</p>
                          <p className="text-xs text-muted-foreground">Edital {row.edital}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">{row.vagas} vagas</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-md bg-background/80 p-2">
                          <p className="text-muted-foreground">ACC</p>
                          <p className="font-semibold text-foreground">{row.acc}</p>
                        </div>
                        <div className="rounded-md bg-background/80 p-2">
                          <p className="text-muted-foreground">PNG</p>
                          <p className="font-semibold text-foreground">{row.pngc > 0 ? row.pngc : "-"}</p>
                        </div>
                        <div className="rounded-md bg-background/80 p-2">
                          <p className="text-muted-foreground">BR-Trans</p>
                          <p className="font-semibold text-foreground">{row.brTrans > 0 ? row.brTrans : "-"}</p>
                        </div>
                        <div className="rounded-md bg-background/80 p-2">
                          <p className="text-muted-foreground">STA</p>
                          <p className="font-semibold text-foreground">{row.sta > 0 ? row.sta : "-"}</p>
                        </div>
                        <div className="rounded-md bg-background/80 p-2">
                          <p className="text-muted-foreground">Isentos</p>
                          <p className="font-semibold text-foreground">{row.isentos}</p>
                        </div>
                        <div className="rounded-md bg-background/80 p-2">
                          <p className="text-muted-foreground">Pagantes</p>
                          <p className="font-semibold text-foreground">{row.pagantes}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-primary/20 bg-muted/40">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-foreground mb-3">Totais gerais</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-md bg-background/80 p-2">
                        <p className="text-muted-foreground">Vagas</p>
                        <p className="font-semibold text-foreground">{totals.vagas}</p>
                      </div>
                      <div className="rounded-md bg-background/80 p-2">
                        <p className="text-muted-foreground">ACC</p>
                        <p className="font-semibold text-foreground">{totals.acc}</p>
                      </div>
                      <div className="rounded-md bg-background/80 p-2">
                        <p className="text-muted-foreground">PNG</p>
                        <p className="font-semibold text-foreground">{totals.pngc}</p>
                      </div>
                      <div className="rounded-md bg-background/80 p-2">
                        <p className="text-muted-foreground">BR-Trans</p>
                        <p className="font-semibold text-foreground">{totals.brTrans}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="hidden md:block overflow-x-auto">
                <Table className="min-w-[860px] text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Turma/Ano</TableHead>
                      <TableHead className="font-bold">Edital</TableHead>
                      <TableHead className="font-bold text-center">Vagas</TableHead>
                      <TableHead className="font-bold text-center">ACC</TableHead>
                      <TableHead className="font-bold text-center">PNG</TableHead>
                      <TableHead className="font-bold text-center">BR-Trans</TableHead>
                      <TableHead className="font-bold text-center">STA</TableHead>
                      <TableHead className="font-bold text-center">Isentos</TableHead>
                      <TableHead className="font-bold text-center">Pagantes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotaData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{row.turma} / {row.ano}</TableCell>
                        <TableCell>{row.edital}</TableCell>
                        <TableCell className="text-center">{row.vagas}</TableCell>
                        <TableCell className="text-center">{row.acc}</TableCell>
                        <TableCell className="text-center">{row.pngc > 0 ? row.pngc : "-"}</TableCell>
                        <TableCell className="text-center">{row.brTrans > 0 ? row.brTrans : "-"}</TableCell>
                        <TableCell className="text-center">{row.sta > 0 ? row.sta : "-"}</TableCell>
                        <TableCell className="text-center">{row.isentos > 0 ? row.isentos : "-"}</TableCell>
                        <TableCell className="text-center">{row.pagantes > 0 ? row.pagantes : "-"}</TableCell>
                      </TableRow>
                    ))}
                    {/* Totals Row */}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={2}>TOTAL</TableCell>
                      <TableCell className="text-center">{totals.vagas}</TableCell>
                      <TableCell className="text-center">{totals.acc}</TableCell>
                      <TableCell className="text-center">{totals.pngc}</TableCell>
                      <TableCell className="text-center">{totals.brTrans}</TableCell>
                      <TableCell className="text-center">{totals.sta}</TableCell>
                      <TableCell className="text-center">{totals.isentos}</TableCell>
                      <TableCell className="text-center">{totals.pagantes}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Legenda das Siglas */}
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Legenda das Siglas:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <span><strong>ACC:</strong> Ampla Concorrência</span>
                <span><strong>PCD:</strong> Pessoas com Deficiência</span>
                <span><strong>PNG:</strong> Pessoas Negras e Pardas</span>
                <span><strong>PIQ:</strong> Pessoas Indígenas/Quilombolas</span>
                <span><strong>BR-Trans:</strong> Pessoas Trans (Baixa Renda)</span>
                <span><strong>STA:</strong> Servidor Técnico Administrativo</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === ABA IDADE E SEXO === */}
        <TabsContent value="demografico">
          {/* Filtro por Ano */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-muted-foreground">Filtrar por ano da seletiva:</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os anos</SelectItem>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* KPI Cards Demográficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Aprovados</p>
                    <p className="text-2xl font-bold">{summary.total}</p>
                    <p className="text-xs text-muted-foreground">últimas 6 seletivas (2020-2025)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Média de Idade (Entrada)</p>
                    <p className="text-2xl font-bold">{summary.mediaIdade}</p>
                    <p className="text-xs text-muted-foreground">anos no ano da seletiva</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-pink-500/10">
                    <User className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sexo Predominante</p>
                    <p className="text-2xl font-bold">{summary.sexoPredominante}</p>
                    <p className="text-xs text-muted-foreground">
                      {summary.feminino}F / {summary.masculino}M
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Percent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">% Feminino</p>
                    <p className="text-2xl font-bold">{summary.percentFeminino}%</p>
                    <p className="text-xs text-muted-foreground">{summary.feminino} de {summary.totalComDados} com dados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Donut Chart - Distribuição por Sexo */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">Distribuição por Sexo {selectedYear !== "Todos" && `(${selectedYear})`}</CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div ref={genderChartRef} className="w-full overflow-x-auto">
                  <div className="p-2 sm:p-4">
                    <ResponsiveContainer width="100%" height={inscrMobile ? 280 : 330}>
                      <PieChart margin={{ top: 10, right: 10, bottom: inscrMobile ? 80 : 20, left: 10 }}>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy={inscrMobile ? "40%" : "50%"}
                          innerRadius={genderMedium ? 50 : inscrMobile ? 45 : 60}
                          outerRadius={genderMedium ? 82 : inscrMobile ? 75 : 100}
                          paddingAngle={5}
                          dataKey="value"
                          nameKey="name"
                          label={inscrMobile ? ({ value, percent }) => `${(percent * 100).toFixed(0)}%` : genderMedium ? ({ value, percent }) => `${value} (${(percent * 100).toFixed(0)}%)` : ({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                          labelLine={inscrMobile ? false : { stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: inscrMobile ? "10px" : "12px"
                          }}
                          formatter={(value: number) => [`${value} aprovados`, ""]}
                        />
                        <Legend 
                          verticalAlign="bottom"
                          height={inscrMobile ? 36 : 30}
                          wrapperStyle={{ 
                            fontSize: inscrMobile ? '10px' : '11px', 
                            paddingTop: inscrMobile ? '8px' : '12px', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            flexWrap: 'wrap', 
                            gap: '8px' 
                          }}
                          iconSize={inscrMobile ? 10 : 12}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart - Distribuição por Faixa Etária */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">
                  Distribuição por Faixa Etária {selectedYear !== "Todos" && `(${selectedYear})`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="faixa" 
                      tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      formatter={(value: number) => [`${value} aprovados`, "Quantidade"]}
                    />
                    <Bar 
                      dataKey="quantidade" 
                      name="Aprovados" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Evolução de Sexo por Ano */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Distribuição por sexo e ano de seleção</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={yearlyGenderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="ano" 
                    tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="Feminino" name="Feminino" fill="hsl(340, 70%, 55%)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="Masculino" name="Masculino" fill="hsl(210, 70%, 55%)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela de Média de Idade na Defesa - Responsivo */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Média de Idade dos Concluintes por Ano de Defesa</CardTitle>
            </CardHeader>
            <CardContent>
              {useIsMobile() ? (
                // Mobile: Stack Cards
                <div className="space-y-3">
                  {ageAtDefenseData.map((row, index) => (
                    <div key={index} className="border border-primary/20 rounded-lg p-4 bg-card">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-primary text-lg">{row.ano}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {row.quantidade} aluno{row.quantidade > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Média de Idade:</span>
                        <span className="text-xl font-bold text-primary">{row.mediaIdade} anos</span>
                      </div>
                    </div>
                  ))}
                  {/* Resumo Geral - Mobile */}
                  {ageAtDefenseData.length > 0 && (
                    <div className="border-2 border-primary rounded-lg p-4 bg-primary/5 mt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">MÉDIA GERAL</p>
                        <p className="text-2xl font-bold text-primary mb-2">
                          {(
                            ageAtDefenseData.reduce((sum, r) => sum + r.mediaIdade * r.quantidade, 0) /
                            ageAtDefenseData.reduce((sum, r) => sum + r.quantidade, 0)
                          ).toFixed(1)} anos
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total: {ageAtDefenseData.reduce((sum, r) => sum + r.quantidade, 0)} concluintes
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Desktop: Tabela com Scroll
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Ano da Defesa</TableHead>
                        <TableHead className="font-bold text-center">Concluintes</TableHead>
                        <TableHead className="font-bold text-center">Média de Idade (anos)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ageAtDefenseData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{row.ano}</TableCell>
                          <TableCell className="text-center">{row.quantidade}</TableCell>
                          <TableCell className="text-center font-bold">{row.mediaIdade}</TableCell>
                        </TableRow>
                      ))}
                      {ageAtDefenseData.length > 0 && (
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>MÉDIA GERAL</TableCell>
                          <TableCell className="text-center">
                            {ageAtDefenseData.reduce((sum, r) => sum + r.quantidade, 0)}
                          </TableCell>
                          <TableCell className="text-center font-bold">
                            {(
                              ageAtDefenseData.reduce((sum, r) => sum + r.mediaIdade * r.quantidade, 0) /
                              ageAtDefenseData.reduce((sum, r) => sum + r.quantidade, 0)
                            ).toFixed(1)}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de Barras - Média de Idade por Ano (Responsivo) */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Evolução da Média de Idade na Defesa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageAtDefenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="ano" 
                    tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }}
                    domain={[20, 45]}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`${value} anos`, 'Média de Idade']}
                    labelFormatter={(label) => `Ano: ${label}`}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="mediaIdade" 
                    fill="hsl(142, 76%, 36%)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <ReferenceLine 
                    y={averageAgeAtDefense} 
                    stroke="#ff6b35" 
                    strokeDasharray="8 4" 
                    strokeWidth={3}
                    label={{ 
                      value: `Média do período: ${averageAgeAtDefense.toFixed(1)} anos`, 
                      position: "top",
                      fill: "#ff6b35",
                      fontSize: 13,
                      fontWeight: "bold",
                      offset: 10
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Nota de Privacidade */}
          <Card className="border-dashed border-2 border-muted mt-6">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">📊 Sobre os Dados:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Dados extraídos dos formulários de inscrição e listas de aprovados (2020-2025)</p>
                <p>• Idade calculada com base no ano da seletiva (entrada no programa)</p>
                <p>• Média de idade na defesa calculada pelo intervalo entre data de nascimento e data da defesa</p>
                <p>• Apenas dados agregados são exibidos para preservar a privacidade dos candidatos</p>
                <p>• Total de {summary.total} aprovados ({summary.totalComDados} com dados demográficos completos)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
