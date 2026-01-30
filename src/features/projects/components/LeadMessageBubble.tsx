"use client";
import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "@/shared/api";

const cn = (...inputs: unknown[]) => twMerge(clsx(inputs));

interface LeadMessageBubbleProps {
  message: Message;
}

export const LeadMessageBubble: React.FC<LeadMessageBubbleProps> = ({
  message,
}) => {
  const isLead = message.senderType === "LEAD";

  return (
    <div
      className={cn(
        "flex w-full mb-4 px-4",
        isLead ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-2xl shadow-sm",
          isLead
            ? "bg-indigo-600 text-white rounded-tr-none"
            : "bg-white text-slate-800 border border-slate-100 rounded-tl-none",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <span
          className={cn(
            "text-[10px] mt-1 block",
            isLead ? "text-indigo-200" : "text-slate-400",
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
