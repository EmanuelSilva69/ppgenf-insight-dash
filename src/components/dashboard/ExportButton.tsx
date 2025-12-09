import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import { AcademicRecord } from "@/data/academicData";
import { toast } from "sonner";

interface ExportButtonProps {
  data: AcademicRecord[];
  filename?: string;
}

export const ExportButton = ({ data, filename = "ppgenf-dados" }: ExportButtonProps) => {
  const prepareExportData = () => {
    return data.map(record => ({
      "Ano": record.ano,
      "Turma": record.turma,
      "Matrícula": record.matricula,
      "Nome": record.nome,
      "Orientador(a)": record.orientador,
      "Linha de Pesquisa": record.linhaPesquisa,
      "Mês/Ano Entrada": record.mesAnoEntrada,
      "Mês/Ano Limite": record.mesAnoLimite,
      "Defesa": record.defesa,
      "Total de Meses": record.totalMeses,
      "Conclusão no Prazo": record.conclusaoNoPrazo === "SIM" ? "Sim" : 
                           record.conclusaoNoPrazo === "NÃO" ? "Não" : "Em andamento"
    }));
  };

  const exportToExcel = () => {
    try {
      const exportData = prepareExportData();
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Dados PPGENF");
      
      // Auto-size columns
      const colWidths = Object.keys(exportData[0] || {}).map(key => ({
        wch: Math.max(key.length, 15)
      }));
      worksheet["!cols"] = colWidths;
      
      XLSX.writeFile(workbook, `${filename}.xlsx`);
      toast.success("Arquivo Excel exportado com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar arquivo Excel");
      console.error(error);
    }
  };

  const exportToCSV = () => {
    try {
      const exportData = prepareExportData();
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      
      toast.success("Arquivo CSV exportado com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar arquivo CSV");
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToExcel} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="h-4 w-4" />
          Exportar para Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          Exportar para CSV (.csv)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
