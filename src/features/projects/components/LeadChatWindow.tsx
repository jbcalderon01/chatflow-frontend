"use client";
import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Message } from "@/shared/api";
import { useDebounce } from "@/shared/hooks";
import { MessageBubble } from "@/features/chat/components/MessageBubble";

interface LeadChatWindowProps {
  messages: Message[];
  agentName: string | null;
  project: string;
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  onReset?: () => void;
  onTyping?: (isTyping: boolean) => void;
}

interface ChatFormValues {
  content: string;
}

export const LeadChatWindow: React.FC<LeadChatWindowProps> = ({
  messages,
  agentName,
  project,
  isTyping,
  onSendMessage,
  onReset,
  onTyping,
}) => {
  const { register, handleSubmit, reset, watch } = useForm<ChatFormValues>();
  const content = watch("content");
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedContent = useDebounce(content ?? "", 500);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const onSubmit = (data: ChatFormValues) => {
    if (!data.content.trim()) return;
    onSendMessage(data.content);
    reset();
  };

  useEffect(() => {
    if (onTyping) {
      onTyping(debouncedContent.length > 0);
    }
  }, [debouncedContent]);

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-slate-50 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
            {agentName ? agentName[0] : "CF"}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              {agentName || "ChatFlow Agent"}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              {project || "Agente de ventas"}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              En línea
            </span>
          </div>
          {onReset && (
            <button
              onClick={onReset}
              className="text-[10px] font-bold text-white uppercase tracking-widest bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-rose-500/30 active:scale-95"
            >
              Finalizar Chat
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-6 space-y-2 scroll-smooth"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} type="LEAD" />
        ))}

        {isTyping && (
          <div className="flex px-8">
            <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex items-center gap-2"
        >
          <input
            {...register("content")}
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-slate-50 border border-slate-100 py-3 px-5 pr-14 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
