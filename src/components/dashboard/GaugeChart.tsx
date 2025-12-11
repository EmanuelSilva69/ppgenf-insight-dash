import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GaugeChartProps {
  title: string;
  percentage: number;
}

export function GaugeChart({ title, percentage }: GaugeChartProps) {
  const rotation = (percentage / 100) * 180 - 90;
  
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square max-w-[280px] mx-auto">
          {/* Background arc */}
          <svg viewBox="0 0 200 120" className="w-full">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Filled arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
              className="transition-all duration-1000 ease-out"
            />
            {/* Needle */}
            <g transform={`rotate(${rotation} 100 100)`}>
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="hsl(var(--foreground))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" />
            </g>
          </svg>
          
          {/* Percentage display */}
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{percentage.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground mt-1">Taxa de conclusão</div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
