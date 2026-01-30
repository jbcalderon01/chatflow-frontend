"use client";
import React from "react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "@/shared/api";

interface MessageBubbleProps {
  message: Message;
  type: "AGENT" | "LEAD";
}

const cn = (...inputs: unknown[]) => twMerge(clsx(inputs));

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  type,
}) => {
  const isAgent = message.senderType === type;

  return (
    <div
      className={cn(
        "flex w-full mb-4 px-4",
        isAgent ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] lg:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm",
          isAgent
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
            isAgent ? "text-indigo-200" : "text-slate-400",
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
