import React, { useState, useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { Send, User, Building, Sparkles, Loader2 } from "lucide-react";
import { Conversation, Message } from "@/shared/api";
import { useAuth, useDebounce } from "@/shared/hooks";
import { SummaryModal } from "./SummaryModal";
import { LoadingState } from "@/shared/components";
import { useGenerateSummary } from "@/shared/api/hooks";

interface ChatWindowProps {
  messages: Message[];
  conversation?: Conversation;
  isTyping: boolean;
  onSendMessage: (content: string) => void;
  onTyping: (isTyping: boolean) => void;
  isLoading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  conversation,
  isTyping,
  onSendMessage,
  onTyping,
  isLoading,
}) => {
  const [content, setContent] = useState("");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentDebounced = useDebounce(content, 500);
  const { user } = useAuth();

  const { mutateAsync: generateSummary, isPending: isGeneratingSummary } =
    useGenerateSummary();

  const handleGenerateSummary = async () => {
    if (!conversation) return;
    try {
      const response = await generateSummary(conversation.id);
      setSummary(response.summary || (response as unknown as string));
      setIsSummaryOpen(true);
    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };

  useEffect(() => {
    if (onTyping) {
      onTyping(contentDebounced.length > 0);
    }
  }, [contentDebounced]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!content.trim()) return;
    onSendMessage(content);
    setContent("");
  };

  if (!conversation) {
    return (
      <div className="flex-1 h-full w-full flex items-center justify-center bg-slate-50 text-slate-400 p-8 text-center">
        <div>
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <p className="text-lg font-medium">Selecciona una conversación</p>
          <p className="text-sm">
            Escoge un prospecto de la lista para comenzar a chatear.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
      <SummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        summary={summary}
      />

      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
            {conversation.lead.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-tight">
              {conversation.lead.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-500 font-medium">
                En línea
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500">
                  {conversation.project.name}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            title="Generar Resumen"
          >
            {isGeneratingSummary ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium hidden md:inline">
                  Generar resumen
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-6 scroll-smooth"
      >
        {isLoading ? (
          <LoadingState message="Cargando mensajes..." />
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} type="AGENT" />
            ))}
            {isTyping && (
              <div className="flex px-4 py-2">
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            disabled={user?.role === "ADMIN"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!content.trim() || user?.role === "ADMIN"}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 p-3 rounded-xl text-white transition-all transform active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
