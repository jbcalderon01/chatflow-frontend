"use client";
import React from "react";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { MetricsSummary } from "@/features/dashboard/components/MetricsSummary";
import { ChartsContainer } from "@/features/dashboard/components/ChartsContainer";

export const DashboardView: React.FC = () => {
  const { metrics } = useDashboard();

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Resumen de Métricas
        </h1>
        <p className="text-slate-500">
          Bienvenido de nuevo, aquí tienes el estado de tus prospectos.
        </p>
      </header>
      {metrics && (
        <>
          <MetricsSummary metrics={metrics} />
          <ChartsContainer metrics={metrics} />
        </>
      )}
    </div>
  );
};
