import { PriorityLevel, StatusTag } from "../types";

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE_LEAD: "Potencial",
  PRICING: "Precios",
  FOLLOW_UP: "Seguimiento",
  CLIENT: "Cliente",
  CLOSED: "Cerrado",
  SUPPORT: "Soporte",
};

export const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

export const STATUS_COLORS: Record<StatusTag, string> = {
  ACTIVE_LEAD: "bg-blue-100 text-blue-700",
  PRICING: "bg-yellow-100 text-yellow-700",
  FOLLOW_UP: "bg-purple-100 text-purple-700",
  CLIENT: "bg-green-100 text-green-700",
  CLOSED: "bg-slate-100 text-slate-700",
  SUPPORT: "bg-indigo-100 text-indigo-700",
};

export const PRIORITY_COLORS: Record<PriorityLevel, string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};
