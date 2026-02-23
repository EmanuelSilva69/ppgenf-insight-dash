import { GraduationCap } from "lucide-react";
import ppgenfLogo from "@/assets/ppgenf-logo.png";
import ufmaLogo from "@/assets/ufma-logo.png";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary py-4 sm:py-6 px-4 sm:px-8 shadow-lg">
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo e Título - Adaptado para Mobile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-white/10 rounded-full flex-shrink-0">
            <GraduationCap className="h-10 w-10 sm:h-14 sm:w-14 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Sistema de Análise de Dados Acadêmicos - PPGENF
            </h1>
            <p className="text-white/90 text-xs sm:text-sm mt-0.5 sm:mt-1">
              Painel de visualização - Dados de 2011 a 2025
            </p>
          </div>
        </div>

        {/* Logos - Centralizadas em Mobile, Direita em Desktop */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 sm:justify-end self-center sm:self-auto">
          <img 
            src={ppgenfLogo} 
            alt="Logo PPGENF - Mestrado Acadêmico em Enfermagem UFMA" 
            className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-white/10 p-1 flex-shrink-0"
          />
          <img 
            src={ufmaLogo} 
            alt="Logo UFMA - Universidade Federal do Maranhão" 
            className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-white/10 p-1 flex-shrink-0"
          />
        </div>
      </div>
    </header>
  );
}
