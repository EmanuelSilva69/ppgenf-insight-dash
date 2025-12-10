import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { AcademicRecord } from "@/data/academicData";
import { useMemo } from "react";

interface QuadrienniumChartProps {
  data: AcademicRecord[];
}

const QUADRIENNIUMS = [
  { label: "2011-2013", start: 2011, end: 2012, note: "(Incompleto)" },
  { label: "2013-2016", start: 2013, end: 2016, note: "" },
  { label: "2017-2020", start: 2017, end: 2020, note: "" },
  { label: "2021-2024", start: 2021, end: 2024, note: "" },
  { label: "2025+", start: 2025, end: 2100, note: "" },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function QuadrienniumChart({ data }: QuadrienniumChartProps) {
  const chartData = useMemo(() => {
    return QUADRIENNIUMS.map((quad, index) => {
      const students = data.filter(r => r.ano >= quad.start && r.ano <= quad.end);
      const completed = students.filter(r => r.defesa !== "").length;
      const ongoing = students.filter(r => r.conclusaoNoPrazo === "EM_ANDAMENTO").length;
      
      return {
        name: quad.note ? `${quad.label} ${quad.note}` : quad.label,
        total: students.length,
        concluidos: completed,
        emAndamento: ongoing,
        color: COLORS[index % COLORS.length]
      };
    }).filter(q => q.total > 0);
  }, [data]);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Distribuição por Quadriênio</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              angle={0}
              textAnchor="middle"
              height={50}
              interval={0}
            />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  total: "Total",
                  concluidos: "Concluídos",
                  emAndamento: "Em Andamento"
                };
                return [value, labels[name] || name];
              }}
            />
            <Legend 
              formatter={(value: string) => {
                const labels: Record<string, string> = {
                  total: "Total",
                  concluidos: "Concluídos",
                  emAndamento: "Em Andamento"
                };
                return labels[value] || value;
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="concluidos" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="emAndamento" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}