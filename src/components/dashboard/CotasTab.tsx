import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function CotasTab() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">Perfil dos Alunos - Cotas, Idade e Sexo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Dados não disponíveis</h3>
            <p className="text-muted-foreground max-w-md">
              Esta seção exibirá visualizações de distribuição por cotas, idade e sexo dos alunos. 
              Os dados ainda não foram inseridos no sistema.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Distribuição por Cotas</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Número de alunos por tipo de cota</p>
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Distribuição por Sexo</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Masculino / Feminino</p>
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Distribuição por Idade</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Faixas etárias dos alunos</p>
                </CardContent>
              </Card>
            </div>
            <Card className="border-dashed border-2 border-muted mt-4 w-full max-w-2xl">
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Cruzamento: Cota × Idade × Sexo</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Análise multidimensional do perfil dos alunos</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}