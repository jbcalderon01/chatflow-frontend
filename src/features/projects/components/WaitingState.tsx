"use client";
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";

export const WaitingState: React.FC = () => {
  return (
    <div className="max-w-md w-full text-center p-12 bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 flex flex-col items-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20 scale-150"></div>
        <div className="relative bg-indigo-600 p-6 rounded-full shadow-lg shadow-indigo-600/40">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-4">Conectando...</h2>
      <p className="text-slate-500 mb-8 leading-relaxed">
        Estamos asignando un asesor especializado para atender tu solicitud.{" "}
        <br />
        <span className="font-semibold text-indigo-600">
          Esto tomará solo unos segundos.
        </span>
      </p>

      <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full text-slate-400 text-sm font-medium">
        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
        Buscando agente disponible
      </div>

      <div className="mt-12 flex gap-1.5">
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      </div>
    </div>
  );
};
