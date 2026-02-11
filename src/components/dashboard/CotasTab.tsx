import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quotaData, getQuotaSummary, getQuotaByYear, getQuotaTotals, inscritosPorCota, getInscritos } from "@/data/quotaData";
import { 
  getGenderDistribution, 
  getAgeDistribution, 
  getDemographicSummary, 
  getYearlyGenderData,
  getAvailableYears,
  approvedCandidates
} from "@/data/demographicData";
import { academicData } from "@/data/academicData";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { Users, UserCheck, FileText, TrendingUp, User, Calendar, Percent } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Calcula média de idade na defesa por ano
function getAverageAgeAtDefenseByYear() {
  const yearData: Record<number, number[]> = {};
  
  academicData
    .filter(r => r.defesa !== "")
    .forEach(record => {
      const candidate = approvedCandidates.find(c =>
        c.nome.toUpperCase().trim() === record.nome.toUpperCase().trim()
      );
      if (candidate) {
        const [diaDefesa, mesDefesa, anoDefesa] = record.defesa.split("/").map(Number);
        const [diaNasc, mesNasc, anoNasc] = candidate.dataNascimento.split("/").map(Number);
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
  
  const quotaSummary = useMemo(() => getQuotaSummary(), []);
  const quotaByYear = useMemo(() => getQuotaByYear(), []);
  const totals = useMemo(() => getQuotaTotals(), []);
  const availableYears = useMemo(() => getAvailableYears(), []);
  const inscritos = useMemo(() => getInscritos(), []);
  const ageAtDefenseData = useMemo(() => getAverageAgeAtDefenseByYear(), []);

  const totalCotas = totals.pcd + totals.pngc + totals.piq + totals.brTrans + totals.sta;
  const percentCotas = totals.vagas > 0 ? ((totalCotas / totals.vagas) * 100).toFixed(1) : "0";

  // Dados demográficos baseados no filtro de ano
  const yearFilter = selectedYear === "Todos" ? undefined : parseInt(selectedYear);
  const genderData = useMemo(() => getGenderDistribution(yearFilter), [yearFilter]);
  const ageData = useMemo(() => getAgeDistribution(yearFilter), [yearFilter]);
  const summary = useMemo(() => getDemographicSummary(yearFilter), [yearFilter]);
  const yearlyGenderData = useMemo(() => getYearlyGenderData(), []);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cotas" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cotas">Cotas</TabsTrigger>
          <TabsTrigger value="demografico">Idade e Sexo</TabsTrigger>
        </TabsList>

        {/* === ABA COTAS === */}
        <TabsContent value="cotas">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Vagas</p>
                    <p className="text-2xl font-bold">{totals.vagas}</p>
                    <p className="text-xs text-muted-foreground">2020-2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ampla Concorrência</p>
                    <p className="text-2xl font-bold">{totals.acc}</p>
                    <p className="text-xs text-muted-foreground">{((totals.acc / totals.vagas) * 100).toFixed(1)}% do total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vagas Cotas</p>
                    <p className="text-2xl font-bold">{totalCotas}</p>
                    <p className="text-xs text-muted-foreground">{percentCotas}% do total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inscritos (Total)</p>
                    <p className="text-2xl font-bold">{totals.isentos + totals.pagantes}</p>
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
                <CardTitle className="text-lg font-semibold text-primary">Distribuição de Vagas por Tipo de Cota</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                      data={quotaSummary}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="total"
                      nameKey="tipo"
                      label={({ tipo, total, percent }) => 
                        `${tipo.split(' ')[0]}: ${total} (${(percent * 100).toFixed(0)}%)`
                      }
                      labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                    >
                      {quotaSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      formatter={(value: number, name: string) => [`${value} vagas`, name]}
                    />
                    <Legend 
                      verticalAlign="bottom"
                      formatter={(value: string) => (
                        <span style={{ color: "hsl(var(--foreground))", fontWeight: "bold", fontSize: 12 }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
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
                    <Legend />
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
              <CardTitle className="text-lg font-semibold text-primary">Vagas Ofertadas vs Inscritos por Tipo de Cota (2020-2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart 
                  data={inscritos.filter(i => i.inscritos > 0 || i.vagas > 0)} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold" }} />
                  <YAxis 
                    dataKey="tipo" 
                    type="category" 
                    tick={{ fill: "hsl(var(--foreground))", fontWeight: "bold", fontSize: 12 }}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === "vagas") return [`${value} vaga(s) ofertada(s)`, "Vagas Ofertadas"];
                      return [`${value} inscritos`, "Inscritos"];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="vagas" name="Vagas Ofertadas" fill="hsl(120, 70%, 50%)" radius={[0, 4, 4, 0]} opacity={0.7} />
                  <Bar dataKey="inscritos" name="Inscritos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                    {inscritos.filter(i => i.inscritos > 0 || i.vagas > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Table */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Detalhamento por Turma e Edital</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
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
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Analisados</p>
                    <p className="text-2xl font-bold">{summary.total}</p>
                    <p className="text-xs text-muted-foreground">aprovados</p>
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
                    <p className="text-sm text-muted-foreground">Média de Idade</p>
                    <p className="text-2xl font-bold">{summary.mediaIdade}</p>
                    <p className="text-xs text-muted-foreground">anos</p>
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
                    <p className="text-sm text-muted-foreground">Gênero Predominante</p>
                    <p className="text-2xl font-bold">{summary.generoPredominante}</p>
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
                    <p className="text-xs text-muted-foreground">{summary.feminino} de {summary.total}</p>
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
                <CardTitle className="text-lg font-semibold text-primary">
                  Distribuição por Sexo {selectedYear !== "Todos" && `(${selectedYear})`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, value, percent }) => 
                        `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                      }
                      labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      formatter={(value: number) => [`${value} aprovados`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
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

          {/* Evolução de Gênero por Ano */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Evolução de Gênero por Ano da Seletiva</CardTitle>
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
                  <Legend />
                  <Bar dataKey="Feminino" name="Feminino" fill="hsl(340, 70%, 55%)" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="Masculino" name="Masculino" fill="hsl(210, 70%, 55%)" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela de Média de Idade na Defesa */}
          <Card className="border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Média de Idade dos Concluintes por Ano de Defesa</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Nota de Privacidade */}
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">📊 Sobre os Dados:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Dados extraídos dos formulários de inscrição e listas de aprovados (2020-2025)</p>
                <p>• Idade calculada com base no ano da seletiva</p>
                <p>• Média de idade na defesa calculada pelo intervalo entre data de nascimento e data da defesa</p>
                <p>• Apenas dados agregados são exibidos para preservar a privacidade dos candidatos</p>
                <p>• Total de {summary.total} aprovados analisados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
