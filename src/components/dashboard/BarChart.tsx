import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

interface BarChartProps {
  title: string;
  data: { name: string; value: number }[];
  showGlobalAverage?: boolean;
  horizontalLabels?: boolean;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function BarChart({ title, data, showGlobalAverage = false, horizontalLabels = false }: BarChartProps) {
  // Calculate global average if needed
  const globalAverage = showGlobalAverage && data.length > 0
    ? data.reduce((sum, item) => sum + item.value, 0) / data.length
    : 0;

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: horizontalLabels ? 20 : 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              angle={horizontalLabels ? 0 : -45}
              textAnchor={horizontalLabels ? "middle" : "end"}
              height={horizontalLabels ? 50 : 100}
              interval={0}
            />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            {showGlobalAverage && globalAverage > 0 && (
              <ReferenceLine 
                y={globalAverage} 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{ 
                  value: `Média Global: ${globalAverage.toFixed(1)} meses`, 
                  position: "insideTopRight",
                  fill: "hsl(var(--destructive))",
                  fontSize: 12,
                  fontWeight: "bold"
                }}
              />
            )}
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}