"use client";
import { ConversationList } from "@/features/chat/components/ConversationList";
import { ChatWindow } from "@/features/chat/components/ChatWindow";
import { useChatView } from "@/features/chat/hooks/useChatView";

export const ChatView: React.FC = () => {
  const {
    conversations,
    messages,
    isTyping,
    sendMessage,
    selectedChatId,
    setSelectedChatId,
    selectedConversation,
    resetSelection,
    notifyTyping,
    isLoading,
  } = useChatView();

  return (
    <div className="flex-1 flex overflow-hidden">
      <div
        className={`${
          selectedChatId ? "hidden md:block" : "block"
        } w-full md:w-80 lg:w-96 flex-shrink-0`}
      >
        <ConversationList
          conversations={conversations}
          activeId={selectedChatId}
          onSelect={setSelectedChatId}
        />
      </div>

      {/* Chat Window (Hidden on mobile if list is selected) */}
      <div
        className={`${
          selectedChatId ? "block" : "hidden md:block"
        } flex-1 min-w-0 flex flex-col shadow-2xl`}
      >
        {selectedChatId && (
          <button
            onClick={resetSelection}
            className="md:hidden p-4 text-indigo-600 font-semibold flex items-center gap-2 bg-white border-b"
          >
            ← Volver a la lista
          </button>
        )}
        <ChatWindow
          onTyping={notifyTyping}
          conversation={selectedConversation}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
