"use client";
import React, { useState } from "react";

import { Search, Building } from "lucide-react";
import { Conversation } from "@/shared/api";
import { PriorityLevel, StatusTag } from "@/shared/types";
import {
  STATUS_LABELS,
  PRIORITY_LABELS,
  STATUS_COLORS,
  PRIORITY_COLORS,
} from "@/shared/consts";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string | null;
  onSelect: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelect,
}) => {
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | "ALL">(
    "ALL",
  );
  const [filterStatus, setFilterStatus] = useState<StatusTag | "ALL">("ALL");

  const filtered = conversations.filter((c) => {
    const matchesSearch = c.lead.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPriority =
      filterPriority === "ALL" || c.priorityLevel === filterPriority;
    const matchesStatus =
      filterStatus === "ALL" || c.statusTag === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Conversaciones
        </h2>
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar prospecto..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="flex-1 text-xs bg-slate-50 border border-slate-100 rounded p-1"
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as PriorityLevel | "ALL")
            }
          >
            <option value="ALL">Prioridad</option>
            {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            className="flex-1 text-xs bg-slate-50 border border-slate-100 rounded p-1"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as StatusTag | "ALL")
            }
          >
            <option value="ALL">Etiqueta</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((c) => {
          const lastMessageIsSenderTypeAgent =
            c.messages[0]?.senderType === "AGENT";
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors relative ${activeId === c.id ? "bg-indigo-50 border-r-4 border-r-indigo-600" : ""}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-slate-800 text-sm truncate">
                  {c.lead.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(c.lastMessageAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <Building className="w-3 h-3 text-indigo-500" />
                <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {c.project.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                {lastMessageIsSenderTypeAgent ? "Yo: " : ""}
                {c.messages[0]?.content}
              </p>
              <div className="flex gap-2 items-center">
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[c.priorityLevel]}`}
                >
                  {PRIORITY_LABELS[c.priorityLevel]}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.statusTag]}`}
                >
                  {STATUS_LABELS[c.statusTag]}
                </span>
                {c.unreadMessagesCount > 0 && (
                  <span className="ml-auto w-4 h-4 bg-indigo-600 text-[10px] text-white flex items-center justify-center rounded-full">
                    {c.unreadMessagesCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
