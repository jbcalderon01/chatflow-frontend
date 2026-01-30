"use client";
import React from "react";
import { Users, MessageCircle, AlertCircle, TrendingUp } from "lucide-react";
import { GetDashboardMetricsResponse } from "@/shared/api";

interface MetricsSummaryProps {
  metrics: GetDashboardMetricsResponse;
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({ metrics }) => {
  const cards = [
    {
      label: "Total Prospectos",
      value: metrics.totalLeads,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Sin Respuesta",
      value: metrics.totalUnreadMessages,
      icon: AlertCircle,
      color: "bg-rose-500",
    },
    {
      label: "Prospectos Activos",
      value: metrics.totalPotentialLeads,
      icon: TrendingUp,
      color: "bg-emerald-500",
    },
    {
      label: "Respuestas Hoy",
      value: metrics.totalMessagesRespondedToday,
      icon: MessageCircle,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]"
        >
          <div className={`${card.color} p-3 rounded-xl text-white shadow-lg`}>
            <card.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">{card.label}</p>
            <p className="text-2xl font-bold text-slate-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
