import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { useElementWidth } from "@/hooks/use-mobile";

interface BarChartProps {
  title: string;
  data: { name: string; value: number }[];
  showGlobalAverage?: boolean;
  horizontalLabels?: boolean;
  compactLabels?: boolean;
  staggeredLabels?: boolean;
  forceLabelAngle?: number;
  chartHeight?: number;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

// Helper to truncate long labels for mobile
const truncateLabel = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// Helper to split label into multiple lines for mobile Y-axis
const splitLabelForMobile = (text: string, screenWidth: number): string[] => {
  if (screenWidth > 480) return [text];
  
  // For very small screens, split by space if text is long
  if (text.length > 20 && text.includes(" ")) {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    
    words.forEach(word => {
      if ((currentLine + " " + word).length > 12) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    return lines.slice(0, 2); // Max 2 lines
  }
  
  return [text];
};

export function BarChart({ title, data, showGlobalAverage = false, horizontalLabels = false, compactLabels = false, staggeredLabels = false, forceLabelAngle, chartHeight = 340 }: BarChartProps) {
  const [chartRef, chartWidth] = useElementWidth<HTMLDivElement>();

  // Calculate global average if needed
  const globalAverage = showGlobalAverage && data.length > 0
    ? data.reduce((sum, item) => sum + item.value, 0) / data.length
    : 0;

  const narrowChart = chartWidth > 0 && chartWidth < 500;
  const veryNarrowChart = chartWidth > 0 && chartWidth < 420;
  const mobileScreen = chartWidth > 0 && chartWidth < 450; // Mobile-specific optimization
  const wrapLabels = compactLabels && chartWidth > 0 && chartWidth < 600;
  const compactWrapLabels = compactLabels && chartWidth > 0 && chartWidth < 520;

  // Responsive modes
  const LARGE_THRESHOLD = 900;
  const SMALL_THRESHOLD = 480;
  const isSmall = chartWidth > 0 && chartWidth <= SMALL_THRESHOLD; // convert to horizontal
  const isMedium = chartWidth > 0 && chartWidth > SMALL_THRESHOLD && chartWidth < LARGE_THRESHOLD; // rotate labels
  const isLarge = chartWidth === 0 || chartWidth >= LARGE_THRESHOLD;
  const horizontalMode = isSmall && data.some(d => d.name && d.name.length > 10);
  const forceAngleProvided = typeof forceLabelAngle === 'number';

  const renderXAxisTick = ({ x, y, payload }: { x?: number; y?: number; payload?: { value?: string; index?: number } }) => {
    const value = payload?.value ?? "";
    const index = payload?.index ?? 0;

    if (!value) {
      return null;
    }

    if (forceAngleProvided) {
      return (
        <g transform={`translate(${x ?? 0}, ${y ?? 0})`}>
          <text
            x={0}
            y={0}
            dy={18}
            textAnchor="end"
            transform={`rotate(${forceLabelAngle})`}
            fill="hsl(var(--muted-foreground))"
            fontSize={10}
            fontWeight="bold"
          >
            {value}
          </text>
        </g>
      );
    }

    if ((wrapLabels && value.length > 8) || (compactWrapLabels && value.includes(" "))) {
      const words = value.split(" ");
      const midpoint = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, midpoint).join(" ");
      const secondLine = words.slice(midpoint).join(" ");

      if (!secondLine) {
        return (
          <g transform={`translate(${x ?? 0}, ${y ?? 0})`}>
            <text x={0} y={0} dy={18} textAnchor="end" fill="hsl(var(--muted-foreground))" fontSize={veryNarrowChart ? 8 : 10} fontWeight="bold">
              {value}
            </text>
          </g>
        );
      }

      return (
        <g transform={`translate(${x ?? 0}, ${y ?? 0})`}>
          <text x={0} y={0} dy={18} textAnchor="end" fill="hsl(var(--muted-foreground))" fontSize={veryNarrowChart ? 8 : 10} fontWeight="bold">
            <tspan x={0} dy="0em">{firstLine}</tspan>
            <tspan x={0} dy="1.1em">{secondLine}</tspan>
          </text>
        </g>
      );
    }

    return (
      <g transform={`translate(${x ?? 0}, ${y ?? 0})`}>
        <text
          x={0}
          y={0}
          dy={18}
          textAnchor={horizontalLabels ? "middle" : "end"}
          transform={horizontalLabels || horizontalMode ? undefined : isMedium || narrowChart || compactLabels ? "rotate(-45)" : undefined}
          fill="hsl(var(--muted-foreground))"
          fontSize={veryNarrowChart ? 8 : compactLabels || narrowChart ? 9 : 11}
          fontWeight="bold"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className={mobileScreen ? "p-3 pt-0" : ""}>
        <div ref={chartRef} className={mobileScreen ? "max-w-full overflow-x-auto -mx-3" : "max-w-full overflow-x-auto"}>
            <ResponsiveContainer width="100%" height={horizontalMode ? (mobileScreen ? 400 : 420) : chartHeight}>
            <RechartsBarChart
              data={data}
              layout={horizontalMode ? "vertical" : undefined}
              margin={{
                top: 5,
                right: mobileScreen ? 8 : narrowChart ? 10 : 30,
                left: horizontalMode ? (mobileScreen ? 85 : veryNarrowChart ? 110 : 120) : narrowChart ? 10 : 20,
                bottom: horizontalMode ? 20 : forceAngleProvided ? (veryNarrowChart ? 150 : narrowChart ? 140 : 110) : (isSmall ? 140 : isMedium ? 100 : 20),
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              {horizontalMode ? (
                <>
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: veryNarrowChart ? 10 : 12, fontWeight: "bold" }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={mobileScreen ? 80 : veryNarrowChart ? 100 : 160}
                    tick={({ x, y, payload }) => {
                      const value = payload?.value ?? "";
                      const lines = splitLabelForMobile(value, chartWidth);
                      const fontSize = mobileScreen ? 9 : veryNarrowChart ? 10 : 12;
                      
                      return (
                        <g transform={`translate(${x ?? 0}, ${y ?? 0})`}>
                          <text 
                            x={0} 
                            y={0} 
                            textAnchor="end"
                            fill="hsl(var(--muted-foreground))" 
                            fontSize={fontSize}
                            fontWeight="bold"
                          >
                            {lines.map((line, idx) => (
                              <tspan key={idx} x={0} dy={idx === 0 ? 0 : "1.1em"}>{line}</tspan>
                            ))}
                          </text>
                        </g>
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="name"
                    tick={renderXAxisTick}
                    angle={typeof forceLabelAngle === 'number' ? forceLabelAngle : (isMedium || narrowChart || compactLabels ? -45 : -30)}
                    textAnchor="end"
                    height={forceAngleProvided ? (veryNarrowChart ? 140 : narrowChart ? 130 : 100) : (veryNarrowChart ? 122 : compactWrapLabels ? 110 : wrapLabels ? 90 : 56)}
                    interval={0}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: "bold" }} />
                </>
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
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
          </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}