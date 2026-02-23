import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
}

export function KPICard({ title, value, subtitle, icon: Icon }: KPICardProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-shadow">
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col xs:flex-row items-start xs:items-center xs:justify-between gap-3 xs:gap-2">
          <div className="flex-1">
            <p className="text-xs xs:text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="p-2 xs:p-3 bg-primary/10 rounded-lg flex-shrink-0">
            <Icon className="h-6 xs:h-7 sm:h-8 w-6 xs:w-7 sm:w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
