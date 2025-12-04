import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary py-6 px-8 shadow-lg">
      <div className="container mx-auto flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-full">
          <GraduationCap className="h-12 w-12 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Sistema de Análise de Dados Acadêmicos - PPGENF
          </h1>
          <p className="text-white/90 text-sm mt-1">
            Painel de visualização - Dados de 2011 a 2025
          </p>
        </div>
      </div>
    </header>
  );
}
