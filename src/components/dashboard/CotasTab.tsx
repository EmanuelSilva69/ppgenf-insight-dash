import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { quotaData, getQuotaSummary, getQuotaByYear, getQuotaTotals, inscritosPorCota } from "@/data/quotaData";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { Users, UserCheck, FileText, TrendingUp } from "lucide-react";

export function CotasTab() {
  const quotaSummary = useMemo(() => getQuotaSummary(), []);
  const quotaByYear = useMemo(() => getQuotaByYear(), []);
  const totals = useMemo(() => getQuotaTotals(), []);

  const totalCotas = totals.pcd + totals.pngc + totals.piq + totals.brTrans + totals.sta;
  const percentCotas = totals.vagas > 0 ? ((totalCotas / totals.vagas) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">Inscritos por Tipo de Cota (Acumulado 2020-2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart 
              data={inscritosPorCota.filter(i => i.inscritos > 0)} 
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
                formatter={(value: number) => [`${value} inscritos`, "Total"]}
              />
              <Bar dataKey="inscritos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                {inscritosPorCota.filter(i => i.inscritos > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="border-primary/20">
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
    </div>
  );
}
