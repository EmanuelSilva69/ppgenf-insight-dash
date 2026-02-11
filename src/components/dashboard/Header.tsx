import { GraduationCap } from "lucide-react";
import ppgenfLogo from "@/assets/ppgenf-logo.png";
import ufmaLogo from "@/assets/ufma-logo.png";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary py-6 px-8 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        <div className="flex items-center gap-4">
          <img 
            src={ppgenfLogo} 
            alt="Logo PPGENF - Mestrado Acadêmico em Enfermagem UFMA" 
            className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-white/10 p-1"
          />
          <img 
            src={ufmaLogo} 
            alt="Logo UFMA - Universidade Federal do Maranhão" 
            className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-white/10 p-1"
          />
        </div>
      </div>
    </header>
  );
}
